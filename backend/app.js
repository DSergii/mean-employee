const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.static('src'));
app.use('/backend/images', express.static('backend/images'));

mongoose.connect('mongodb+srv://sdrozd:XpXe3XxShO3WEZLD@employee.t1szm0v.mongodb.net/?retryWrites=true&w=majority&appName=Employee')
  .then(() => {
    console.log('Connected to DB')
  })
  .catch(() => {
    console.error('Connection failed')
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/user', userRoutes)

module.exports = app;
