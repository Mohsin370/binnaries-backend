const express = require('express');
const userController = require('./src/controllers/usersController');









const app = express();
app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin,Access-Control-Allow-Methods,Access-Control-Allow-Headers,Content-Type,Authorization');
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });


//User Routes
app.post('/users/signup', userController.SignUp);
app.post('/users/login', userController.Login);


app.listen(process.env.PORT || 4000);