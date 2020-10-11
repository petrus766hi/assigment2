const express = require('express');
const Users = express.Router ();
const GetResourceCon = require('../controller/GetResource')

Users.get('/api/resource/:userId', GetResourceCon.GetResourceId)

module.exports = Users