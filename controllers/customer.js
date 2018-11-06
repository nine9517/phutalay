const customer = require('../models/customer');

module.exports = {
    insert : async(req, res) =>{
        
        const newCustomer = new customer({
            name : req.body.name,
            gender : req.body.gender,
            idCard : req.body.idCard,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address
        })
        newCustomer.save((err)=>{
            if(err){
                res.status(200).json({
                    status : 1,
                    message : err
                });
            }else{
                res.status(200).json({
                    status : 0,
                    message : 'Success'
                })
            }
        })
    },
    getAll: async (req, res)=> {
        
        const FindCustomer = await customer.find();
        if(FindCustomer){
            res.status(200).json({
                status : 1,
                message : "Success to get all user",
                data : FindCustomer
            });
        }
    },

    
}