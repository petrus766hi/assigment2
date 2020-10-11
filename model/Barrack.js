const mongoose = require('mongoose')
const Schema = mongoose.Schema


const BarrackSchema = new Schema({
    barrackSoldier: {type: Number, min: 0, max: 20},
    idUser: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type:String, default:'new Barrack'},
    lastCollect:{type:Number, default: Date.now()}
},{
    timestamps: { createdAt: 'created_at' , updatedAt: 'update_at'}
})

const Barrack = mongoose.model('Barrack', BarrackSchema)
module.exports = Barrack