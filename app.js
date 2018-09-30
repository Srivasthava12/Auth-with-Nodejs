const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const cred = require('./cred/database');
const users = require('./routes/users');


const app = express();
const port = process.env.PORT || 80;

//Connecting to mongoos
mongoose.connect(cred.database);

mongoose.connection.on('connected', () => {
  console.log('Connected to Database', cred.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Connecting to Database ERROR', err);
});





//Cors Middleware
app.use(cors());
//Body-Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//So anything with /users will go to ./routes/users
app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Hi there');
});


app.listen(port, () => {
  console.log('Server Started On', port);
})
