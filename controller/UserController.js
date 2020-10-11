const User = require('../model/User')
const bcrypt = require ('bcryptjs');
const saltRounds = 10;
const {check, validationResult} = require ('express-validator');
class UserController{
    static Register (req, res){
        const errors = validationResult (req);
        if (!errors.isEmpty ()) {
          return res.status (400).json ({errors: errors.array ()});
        }

        bcrypt.hash (req.body.Password, saltRounds, function (err, hash) {
          User.create ({
            UserName: req.body.UserName,
            Email: req.body.Email,
            Password: hash,
          })
            .then (result => {
              res.status (201).json ({
                msg: 'Success Create',
                data: result,
              });
            })
            .catch (err => {
              res.status (500).json ({
                msg: 'Failed Register',
                detail: err,
              });
            });
        });
    }
}

module.exports = UserController

