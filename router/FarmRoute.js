const express = require('express');
const Farm = express.Router ();
const FarmCon = require('../controller/FarmContoller');
const MidFarm = require('../middleware/midFarm')
const Auth = require('../middleware/auth');

Farm.get('/api/farm' , Auth, FarmCon.GetFarm)
Farm.get('/api/farm/:farmId' ,Auth ,FarmCon.GetFarmId)
Farm.post('/api/farm' ,Auth, MidFarm,FarmCon.CreateFarm)
Farm.put('/api/farm/:farmId', Auth, FarmCon.UpdateFarmId)
Farm.get('/api/farm/:farmId/colect', Auth, FarmCon.CollectFarmId)


module.exports = Farm;