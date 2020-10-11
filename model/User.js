const mongoose = require('mongoose');
const Schema = mongoose.Schema


const UserSchema = new Schema({
    UserName : {type: String, required: true},
    Email: {type: String , required: true},
    Password: {type: String, required: true},
    Resource:{
        Health:{type: Number, min: 0, max: 1000, default: 100},
        Gold:{type: Number, min: 0, max: 1000, default: 100},
        Energy:{type: Number, min: 0, max: 1000, default: 100},
        Food:{type: Number, min: 0, max: 1000, default: 100},
        Soldiers:{type: Number, min: 0, max: 1000, default: 10},
        Medals: {type: Number, min: 0, max: 1000, default: 5}
    },
},
{
    timestamps: true
})

const User = mongoose.model("User", UserSchema)

module.exports = User