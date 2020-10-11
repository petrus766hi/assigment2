const express = require('express');
const Attack = express.Router ();
const AttackCon = require('../controller/AttackController');
const Auth = require('../middleware/auth')

Attack.post('/api/attack/:defenderId', Auth, AttackCon.AttackerController)

module.exports = Attack