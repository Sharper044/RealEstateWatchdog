require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session')
    , Chron = require('cron')
    , xmlparser = require('express-xml-bodyparser')
    , searchControler = require('./search/search');

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
    res.status(404).send('Please Log In');
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
  let { user_id, location, amount, cashDeal, rate, moveIn, sortBy, emailResults } = req.body;

  db.save_search([user_id, location, amount, cashDeal, moveIn, rate, sortBy, emailResults])
    .then(search => {
      res.status(200).send(search);
    })
});

app.put('/api/updateSearch', (req, res)=>{
  const db = app.get('db');
  let { search_id, user_id, location, amount, cashDeal, rate, moveIn, sortBy, emailResults } = req.body;

  db.update_search([user_id, location, amount, cashDeal, moveIn, rate, sortBy, emailResults, search_id])
    .then(search => {
      res.status(200).send(search);
    })
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

app.listen(process.env.SERVER_PORT, () => console.log(`Hailing frequencies open on port ${process.env.SERVER_PORT}...`));  