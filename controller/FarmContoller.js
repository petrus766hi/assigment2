const Farm = require('../model/Farm')
const User = require('../model/User')

class FarmContoller {
    static CreateFarm(req, res){
        const {id} = req.user
        Farm.create({
            foodMarket: 0,
            idUser: id
        })
        .then(result =>{
            res.status (201).json ({
                msg: 'Success Create',
                data: result,
            });
        })
        .catch(err =>{
            res.status (500).json ({
                msg: 'Failed Register',
                detail: err,
              });
        })

    }
    static GetFarm (req, res){
        const {id} = req.user
        Farm.find({idUser: id})
        .then(result =>{
            res.status (201).json ({
                msg: 'Success Get',
                data: result,
            });
        })
        .catch(err =>{
            res.status (500).json ({
                msg: 'Failed Get',
                detail: err,
            });
        })
    }
    static GetFarmId  (req, res){
        Farm.findById(req.params.farmId)
            .then(result =>{
                res.status (201).json ({
                    msg: 'Get Success',
                    data: result,
                });
            })
            .catch(err =>{
                res.status (500).json ({
                    msg: 'Failed Get',
                    detail: err,
                  });
            })
    }
    static UpdateFarmId (req, res){
        const{name} = req.body
        const{farmId} = req.params
        Farm.findByIdAndUpdate(farmId, {name: name}, {new: true})
        .then(result =>{
            if(result){
                res.status (201).json ({
                    msg: 'Succes Update',
                    detail: result,
                  });
            }else{
                res.status(400).send({msg:"tidak ada"})
            }
        })
        .catch(err =>{
            res.status (500).json ({
                msg: 'Failed Get',
                detail: err,
              });
        })
    }
    static CollectFarmId (req, res){
        let foods;
        Farm.findById(req.params.farmId)
        .then((result)=>{
            if(result){
             foods = Math.floor((Date.now() - result.lastCollect) / 60000);
             foods = foods > 20 ? 20 : foods;
             Farm.findByIdAndUpdate(req.params.farmId, {foodMarket: foods, lastCollect: Date.now()}, {new: true}, function (err, results) {
                if (err){
                    res.status(400).json({msg: "Failed Collect", data: err })
                }
                else{
                    res.status(201).json({msg: "Succes Updated Collect", data: result })
                }
             })
            }
        })
        .then((user) =>{
            const{id} = req.user
            return User.findById(id)
        })
        .then((users) =>{
            const{id} = req.user
            const resource = users.Resource;
            resource.Food += foods;
            return User.updateOne({_id: id} ,{ Resource: resource })
        })

        .catch((err)=>{
            console.log(err)
        })
    }
}

module.exports = FarmContoller