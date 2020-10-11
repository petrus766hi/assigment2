const Barrack = require('../model/Barrack')
const User = require('../model/User')

class BarrackContoller {
    static CreateBarrack(req, res){
        const {id} = req.user
        Barrack.create({
            barrackSoldier: 0,
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
    static GetBarrack (req, res){
        const {id} = req.user
        console.log('xxx', id)
        Barrack.find({idUser: id})
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
    static GetBarrackId  (req, res){
        Barrack.findById(req.params.barrackId)
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
    static UpdateBarrackId (req, res){
        const {name} = req.body
        const{barrackId} = req.params
        Barrack.findByIdAndUpdate(barrackId, {name: name} , {new: true })
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
    static CollectBarrackId (req, res){
        let soldiers;
        Barrack.findById(req.params.barrackId)
        .then((result)=>{
            if(result){
             soldiers = Math.floor((Date.now() - result.lastCollect) / 60000);
             soldiers = soldiers > 10 ? 10 : soldiers;
             Barrack.findByIdAndUpdate(req.params.barrackId, {barrackSoldier: soldiers, lastCollect: Date.now()}, {new: true}, function (err, results) {
                if (err){
                    res.status(400).json({msg: "Failed Collect", data: err })
                }
                else{
                    res.status(201).json({msg: "Succes Updated Collect", data: results })
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
            resource.Soldiers += soldiers;
            return User.updateOne({_id: id} ,{ Resource: resource })
        })

        .catch((err)=>{
            res.status(400).json({msg: "Failed", data: err })
        })
    }
}

module.exports = BarrackContoller