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

//prototype search endpoint used to test search function
app.put('/search', searchControler.search );

app.listen(process.env.SERVER_PORT, () => console.log(`Hailing frequencies open on port ${process.env.SERVER_PORT}...`));  