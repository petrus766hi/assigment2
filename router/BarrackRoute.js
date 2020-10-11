const express = require('express');
const Barrack = express.Router ();
const BarrackCon = require('../controller/BarrackContoller');
const MidBarrack = require('../middleware/midBarrack')
const Auth = require('../middleware/auth');

Barrack.get('/api/barrack' , Auth, BarrackCon.GetBarrack)
Barrack.get('/api/barrack/:barrackId' ,Auth ,BarrackCon.GetBarrackId)
Barrack.post('/api/barrack',Auth,MidBarrack,BarrackCon.CreateBarrack)
Barrack.put('/api/barrack/:barrackId', Auth, BarrackCon.UpdateBarrackId)
Barrack.get('/api/barrack/:barrackId/colect', Auth, BarrackCon.CollectBarrackId)


module.exports = Barrack;