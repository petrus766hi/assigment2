const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FarmSchema = new Schema({
    foodMarket: {type: Number, min: 0, max: 20},
    idUser: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type:String, default:'new Farm'},
    lastCollect:{type:Number, default: Date.now()}
},{
    timestamps: { createdAt: 'created_at' , updatedAt: 'update_at'}
})

const Farm = mongoose.model('Farm', FarmSchema)
module.exports = Farm