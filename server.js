const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ninuc',
    password : '',
    database : 'smartbrain'
  }
});

app.get('/', (req, res) => {
  res.send("It is working!");
});

app.post('/signin', (req, res) => { 
  signin.handleSignin(req, res, db, bcrypt)
});

app.post('/register', (req, res) => { 
  register.handleRegister(req, res, db, bcrypt)
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db)
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
});

app.post('/imageurl', (req, res) => {
  image.handleAPICall(req, res)
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});