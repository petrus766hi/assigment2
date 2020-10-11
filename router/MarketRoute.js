const express = require('express');
const Market = express.Router ();
const MarketCon = require('../controller/MarketContoller');
const MidMarket = require('../middleware/midMarket')
const Auth = require('../middleware/auth');

Market.get('/api/market' ,Auth, MarketCon.GetMarket)
Market.get('/api/market/:marketId' ,Auth ,MarketCon.GetMarketId)
Market.post('/api/market' ,Auth, MidMarket,MarketCon.CreateMarket)
Market.put('/api/market/:marketId', Auth, MarketCon.UpdateMarketId)
Market.get('/api/market/:marketId/colect', Auth, MarketCon.CollectMarketId)


module.exports = Market;