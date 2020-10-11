const express = require ('express');
const Regis = express.Router ();
const {check, validationResult} = require ('express-validator');
const UserCon = require('../controller/UserController')
Regis.post ('/api/register',[
    check ('UserName', 'Nama harus di isi').not ().isEmpty (),
    check ('Email', 'Isi dengan valid email').isEmail (),
    check ('Password', 'Isi password minimal 6 atau lebih karakter').isLength ({
      min: 6,
    }),
  ], UserCon.Register

);

module.exports = Regis;
