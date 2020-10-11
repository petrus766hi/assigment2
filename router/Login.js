const express = require ('express');
const Login = express.Router ();
const User = require ('../model/User');
const auth = require ('../middleware/auth');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken')
const {check, validationResult} = require ('express-validator');
// const Market = require('../model/Market');
const LoginCon = require('../controller/LoginController')
Login.get ('/api/login', auth, LoginCon.getLogin);

Login.get ('/api/logins', LoginCon.getAllUser  );

Login.patch ('/api/login/:userId', LoginCon.updateUser)


Login.post('/api/login', [
  check ('Email', 'Isi dengan valid email').isEmail (),
  check ('Password', 'Isi password minimal 6 atau lebih karakter').exists()
], LoginCon.Login
)
module.exports = Login;
