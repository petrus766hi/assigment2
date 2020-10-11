const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MarketSchema = new Schema({
    goldMarket: {type: Number, min: 0, max: 20},
    idUser: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type:String, default:'new market'},
    lastCollect:{type:Number, default: Date.now()}


},{
    timestamps: { createdAt: 'created_at' , updatedAt: 'update_at'}
})

const Market = mongoose.model('Market', MarketSchema)
module.exports = Market