const Market = require('../model/Market')
const User = require('../model/User')

class MarketContoller {
    static CreateMarket(req, res){
        const {id} = req.user
        Market.create({
            goldMarket: 0,
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
    static GetMarket (req, res){
        const {id} = req.user
        Market.find({idUser: id})
        .then(result =>{
            console.log(result)
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
    static GetMarketId  (req, res){
        Market.findById(req.params.marketId)
            .then(result =>{
                res.status (201).json ({
                    msg: 'Get Succes',
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
    static UpdateMarketId (req, res){
        const{name} = req.body
        const{marketId} = req.params
        Market.findByIdAndUpdate(marketId, {name: name}, {new: true})
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
    static CollectMarketId (req, res){
        let golds;
        Market.findById(req.params.marketId)
        .then((result)=>{
            if(result){
             golds = Math.floor((Date.now() - result.lastCollect) / 60000);
             golds = golds > 50 ? 50 : golds;
             Market.findByIdAndUpdate(req.params.marketId, {goldMarket: golds, lastCollect: Date.now()}, {new: true}, function (err, results) {
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
            resource.Gold += golds;
            return User.updateOne({_id: id} ,{ Resource: resource })
        })

        .catch((err)=>{
            console.log(err)
        })
    }
}

module.exports = MarketContoller