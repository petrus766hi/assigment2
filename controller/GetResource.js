const User = require('../model/User');

class GetResource{
    static async GetResourceId (req, res){
        User.findById(req.params.userId)
        .then(result =>{
            res.status (201).json ({
                msg: 'Get Success',
                data: result.Resource,
            });
        })
        .catch(err =>{
            res.status (500).json ({
                msg: 'Failed Get',
                detail: err,
              });
        })
    }
}

module.exports = GetResource
