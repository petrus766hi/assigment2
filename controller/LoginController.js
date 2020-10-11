const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken')
const {check, validationResult} = require ('express-validator');
const User = require ('../model/User');
class LoginUser {
    static async getLogin (req, res){
        try {
          const user = await User.findById(req.user.id).select(
            '-password'
          )
          res.json (user);
        } catch (err) {
          res.status(500).json(err)
        }
    }
    static async getAllUser(req, res){
        try {
          const user = await User.find().select(
            '-password'
          )
          res.json (user);
        } catch (err) {
          res.status(500).json(err)
        }
    }
    static async updateUser (req, res){
        const {MarketId} = req.body
        User.findByIdAndUpdate(req.params.userId, {
          $push:{
            Markets: MarketId
          }
        }, {new: true})
        .then((result) =>{
          res.status(201).json({msg: "Created", data: result})
        })
        .catch((err) =>{
          res.status(500).json({msg:"failed", data:err})
        })
    }
    static async Login (req,res) {
        const errors = validationResult (req);
        if (!errors.isEmpty ()) {
          return res.status (400).json ({errors: errors.array()});
        }

        const{ Email, Password} = req.body
        try{
          const userName = await User.findOne({Email})
          if(!userName){
            return res.status(400).json({msg:"User Invalid"})
          }
          const matchPassword = await bcrypt.compare(Password, userName.Password)
          if(!matchPassword){
            return res.status(400).json({error: [{msg: "Invalid Username/Email"}]})
          }

          const token = {
            user : {
              id : userName.id
            }
          }
          jwt.sign(token, 'jwtSecret', { expiresIn: '1h' }, (err, tokens) =>{
            if(err){
              throw err
            }else{
              res.json({data: userName,tokens})
            }
          })

        }catch(err){
          res.status(500).json(err)
        }
    }
}

module.exports = LoginUser