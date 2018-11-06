const employee = require('../models/employee');

module.exports = {
    insert : async(req, res) => {
        const newEmployee = new employee({
            name : req.body.name,
            gender : req.body.gender,
            idCard : req.body.idCard,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address,
            position : req.body.position,
            salary : req.body.salary,
            status : req.body.status
        })
        newEmployee.save((err)=>{
            if(err){
                res.status(200).json({
                    status : 0,
                    message : err
                });
            }else{
                res.status(200).json({
                    status : 1,
                    message : 'Add employee Success!!'
                });
            }
        })
    }
}