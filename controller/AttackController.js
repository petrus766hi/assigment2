const User = require('../model/User')
class AttackController{
    static checkSuccess(attackerSoldiers, defenderSoldiers) {
      console.log('attackerSoldiers', attackerSoldiers)
      console.log('defenderSoldiers', defenderSoldiers)
        const arr = [];
        for (let i = 0; i < 3; i++) {
          arr.push(Math.random() < attackerSoldiers / (defenderSoldiers + 1));
        }
        return arr.filter((el) => el).length >= 2 ? true : false;
    }
    static async AttackerController(req, res, next){
        let attacker;
        let defender;
        const AttackerId = req.user.id
        const DefenderId = req.params.defenderId
        let checkAttack
        const {SendSoldier} = req.body
        User.findById(AttackerId, {new: true})
        .then((attackerResult) => {
          if (attackerResult) {
            attacker = attackerResult;
            return User.findById(DefenderId);
          } else {
           res.status(400).json('USER_NOT_FOUND');
          }
        })
        .then((defenderResult) => {
          if (defenderResult) {
            defender = defenderResult;
            const AttackerSoldier =attacker.Resource.Soldiers
            if (AttackerSoldier >= SendSoldier) {
              return User.findOneAndUpdate({_id: {$gte:AttackerId} }, {'Resource.Soldiers' : AttackerSoldier - SendSoldier}, {new: true});
            } else {
              res.status(400).json('NOT_ENOUGH');
            }
          } else {
            res.status(400).json('USER_NOT_FOUND');

          }
        })
        .then((attackerResult) => {
          const defenderSoldiers = defender.Resource.Soldiers
          const medals = attackerResult.Resource.Medals
          const foods = attackerResult.Resource.Food
          const golds = attackerResult.Resource.Gold
          checkAttack= AttackController.checkSuccess(SendSoldier,defenderSoldiers);

          if (checkAttack) {
            return User.findOneAndUpdate({_id: {$gte:AttackerId}},{ 'Resource.Medals': medals + 5, 'Resource.Food': foods + Math.floor(defender.Resource.Food / 2), 'Resource.Gold': golds + Math.floor(defender.Resource.Gold/ 2)}, {new:true});

          } else {
            return User.findOneAndUpdate({_id: {$gte:AttackerId}},{ 'Resource.Medals': Math.floor(Math.floor(medals) / 2)}, {new:true});
          }
        })
        .then((attackerResult) => {
          const medals = defender.Resource.Medals
          const foodsDef = defender.Resource.Food
          const goldsDef= defender.Resource.Gold
          if(checkAttack){
            return User.findOneAndUpdate({_id: {$gte:DefenderId}},{'Resource.Food': foodsDef + Math.ceil(defender.Resource.Food / 2), 'Resource.Gold': goldsDef + Math.ceil(defender.Resource.Gold / 2)}, {new:true});
          }else{
            return User.findOneAndUpdate({_id: {$gte:DefenderId}},{'Resource.Medals': medals + 2 }, {new:true});
          }
        })
        .then((defenderResult) => {
          defender = defenderResult;
          res.status(200).json({
            success: true,
            message: `Attacker ${checkAttack? 'Success' : 'Failed'}`,
            data: attacker
          });
        })
        .catch((err) =>{
          res.status(500).json({msg: "Failed", data: err})
        });

    }
}

module.exports = AttackController