require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')
    , Cron = require('cron').CronJob
    , xmlparser = require('express-xml-bodyparser')
    , searchControler = require('./search/search')
    , nodemailer = require('nodemailer')
    , axios = require('axios')
    , xmlString = require('./search/XMLString');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(xmlparser());
app.use(express.static(__dirname + '/../build'));

massive(process.env.CONNECTION_STRING).then( db => app.set('db', db))

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: '/auth/callback',
  scope: 'openid profile email'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db');
    const { sub, email } = profile._json;

    db.find_user([sub])
    .then( response => {
        if (response.length > 0){
            done(null, response[0].user_id)
        } else {
            db.regester([sub, email])
              .then( response => { 
                done(null, response[0].user_id) })
        }
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/about',
  failureRedirect: 'http://localhost:3000/#/'
}))

app.get('/api/userData', (req, res) => {
  if (!req.user) {
    res.status(404).redirect('http://localhost:3000/#/');
  } else {
    res.status(200).send(req.user);
  }
})

app.get('/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect('http://localhost:3000/#/');
})

//prototype search endpoint used to test search function
app.put('/search', searchControler.search );

app.post('/api/saveSearch', (req, res)=>{
  const db = app.get('db');
  let { user_id, location, ammount, cash_deal, rate, move_in, sort_by, email } = req.body;

  db.save_search([user_id, location, ammount, cash_deal, move_in, rate, sort_by, email])
    .then(search => {
      res.status(200).send(search);
    })
});

app.put('/api/updateSearch', (req, res)=>{
  const db = app.get('db');
  let { search_id, user_id, location, ammount, cash_deal, rate, move_in, sort_by, email } = req.body;

  db.update_search([user_id, location, ammount, cash_deal, move_in, rate, sort_by, email, search_id])
    .then(search => {
      res.status(200).send(search);
    }).catch(console.log)
});

app.post('/api/getSearches', (req, res) => {
  const db = app.get('db');
  let { user_id } = req.body;

  db.search_list([user_id])
    .then(list => {
      res.status(200).send(list);
    })
});

app.post('/api/getSearch', (req, res) => {
  const db = app.get('db');
  let { search_id } = req.body;

  db.get_search([search_id])
    .then(list => {
      res.status(200).send(list);
    })
});

app.delete('/api/deleteSearch', (req, res) => {
  const db = app.get('db');
  let { search_id, user_id } = req.body;
  db.delete_search([search_id, user_id])
    .then(list => {
      res.status(200).send(list);
    })
});

//email cron function:
new Cron({
  cronTime:`* * 1 1,15 * *`, //run every day at 2AM
  onTick: async function() {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    let db = app.get('db');
    let day = new Date().getDate();
    let stack1 = []
    let searches = await db.get_all_searches().then(r => r).catch(console.log)
    let resArrays = [];
    for(let i = 0; i < searches.length; i++) {
      let array = await searchControler.emailSearch(searches[i], db)
      resArrays.push(array);
    };       
      resArrays.forEach( (result, i) => {
        let sortByStr = searches[i].sort_by == 0 ? `Cap Rate: ${home.capRate}%` : searches[i].sort_by == 1 ? `Cash Yield: ${home.cashFlow}%` : `Cash Flow: $${home.cashFlow}%`;
    
        let str = ''
        result[searches[i].sort_by].forEach(home => {
          str += `<div><h3>${home.street_number} ${home.street_name} ${home.street_suffix}, ${home.city} ${home.state}, ${home.postal_code} List Price: $${home.list_price} ${sortByStr}</h3><a href="${home.ZillowLink}"><p>See property on Zillow</p></a></div>`
        })
        let mailOptions = {
          from: process.env.EMAIL,
          to: searches[i].email,
          subject: 'Real Estate Watchdog Bi-Weekly Search Results',
          html: `<a href="http://www.rewatchdog.com"><header><h1>Real Estate Watchdog Bi-Weekly Sniff-Out</h1></header></a><div><p>Greetings from the Real Estate Watchdog! Our faithful watchdog, ever-vigalent, has sniffed out these leads for you in your area of intrest: </p></div><div>${str}</div><p>If you would like to see these in greater detail, feel free to come to <a href="http://www.rewatchdog.com">our site</a> and run this search again. Thank you for using the Real Estate Watchdog</p><footer><a href="http://www.rewatchdog.com">Real Estate Watchdog</a> © 2018 Zillow and the rent Zestamate are property of Zillow.com</footer>`
        }

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      })
    
    // if (new Date().getDay() === dayToRun) {
    //   console.log('true!!')
    // }
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});

app.post('/send_email', async (req, res) => {
  
  let db = app.get('db');
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  
  let str = ''
  req.body.results.data[req.body.sort_by].forEach(home => {

    let sortByStr = req.body.sort_by == 0 ? `Cap Rate: ${home.capRate}%` : req.body.sort_by == 1 ? `Cash Yield: ${home.cashFlow}%` : `Cash Flow: $${home.cashFlow}%`;

    str += `<div><h3>${home.street_number} ${home.street_name} ${home.street_suffix}, ${home.city} ${home.state}, ${home.postal_code} List Price: $${home.list_price} ${sortByStr}</h3><a href="${home.ZillowLink}"><p>See property on Zillow</p></a></div>`
  })

  let email = await db.get_email([req.body.user]).then(r => r);
  console.log(email[0].email);
  let mailOptions = {
    from: process.env.EMAIL,
    to: email[0].email,
    subject: 'Your Real Estate Watchdog Search Results!',
    html: `<a href="http://www.rewatchdog.com"><header><h1>Real Estate Watchdog Search Results</h1></header></a><div><p>Greetings from the Real Estate Watchdog! Per your request, here are the results of your search today: </p></div><div>${str}</div><p>If you would like to see these in greater detail, feel free to come to <a href="http://www.rewatchdog.com">our site</a> and run this search again. Thank you for using the Real Estate Watchdog</p><footer><a href="http://www.rewatchdog.com">Real Estate Watchdog</a> © 2018 Zillow and the rent Zestamate are property of Zillow.com</footer>`
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});



app.listen(process.env.SERVER_PORT, () => console.log(`Hailing frequencies open on port ${process.env.SERVER_PORT}...`));  