const User = require('../model/User')

module.exports = async function(req,res, next){
  const {id} = req.user
    User.findById(id)
    .then((result) =>{
      const gold = result.Resource.Gold
      const food = result.Resource.Food
      if(gold >= 10 && food >= 30){
       User.findByIdAndUpdate(result._id, {$set: {'Resource.Gold' :gold - 10, 'Resource.Food' :food - 30 }}, {new: true })
       .then((user) =>{
        next()
       })

      }else{
        res.status(400).json({msg:'Resource Tidak Cukup'})
      }
    })
    .catch((err)=>{
      res.status(500).json(
        {
          msg:'Gagal Membuat Farm',
          detail: err
        }
      )
    })
}