const Reservation = require('../models/reservation');
const Room = require('../models/room');

module.exports = {
    insert: async (req, res) => {
        console.log(req.body);
        const reservation = new Reservation({
            customer: req.body.customer,
            employee: req.body.employee,
            total: req.body.total,
            remaining: req.body.remaining,
            roomType : req.body.roomType,
            dateBooking: {
                dateCheckStart: new Date(parseInt(req.body.dateCheckStart)),
                dateCheckEnd: new Date(parseInt(req.body.dateCheckEnd)),
                at: new Date()
            },
            brekage: [],
            status: 0

        })
        reservation.save((err) => {
            if (err) {
                res.status(200).json({
                    status: 1,
                    message: err
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message: 'Insert Success'
                });
            }
        })
    },
    insertRedirect: async (req, res) => {
        console.log(req.body);
        req.body.$lookup
        var total=0;
        var roomtypeBook = [];
        for (let index = 0; index < req.body.reV_roomType_name.length; index++) {
            if(req.body.reV_roomType_amount[index]>0){
                roomtypeBook.push(req.body.reV_roomType_name[index]);
                total += parseInt(req.body.reV_roomType_amount[index])*parseInt(req.body.reV_roomType_price[index]);
            }
        }
        const reservation = new Reservation({
            customer: req.body.reV_cus,
            employee: req.body.employee,
            total: total,
            remaining: total*0.5,
            roomType : roomtypeBook,
            dateBooking: {
                dateCheckStart: new Date(req.body.reV_dateS),
                dateCheckEnd: new Date(req.body.reV_dateE),
                at: new Date()
            },
            brekage: [],
            status: 0

        })
        reservation.save((err) => {
            if (err) {
                console.log(err);
            }  
            res.redirect('/');
        })
    },
    checkIn: async (req, res) => {
        // console.log(req.body);
        const reservationFind = await Reservation.findById(req.body.id);
        if (reservationFind) {
            reservationFind.checkIn = new Date();
            reservationFind.room = req.body.roomchackin;
            reservationFind.remaining = 0;
            reservationFind.status = 1;
            reservationFind.save((err) => {
                if (err) {
                    console.log(err);
                } 
                req.body.roomchackin.forEach(async (item)=>{
                    let room = await Room.findById(item);
                    room.status = "ไม่ว่าง";
                    await room.save();
                });
                res.redirect('/');
            });
        } else {
            console.log("Not found!!");
            res.redirect('/');
        }
    },
    checkOut: async (req, res) => {
        const reservationFind = await Reservation.findById(req.body.id);
        if (reservationFind) {
            reservationFind.checkOut = new Date();
            reservationFind.status = 3;
            reservationFind.save((err) => {
                if (err) {
                    console.log(err);
                }  
                res.redirect('/');
            })
        } else {
            res.status(200).json({
                status: 0,
                message: "Not found"
            })
        }
    },

    delete: async (req, res) => {
        const reservationFind = await Reservation.findById(req.body.id);
        if (reservationFind) {

            reservation.remove((err) => {
                if (err) {
                    res.status(200).json({
                        status: 0,
                        message: err
                    });
                }else{
                    res.status(200).json({
                        status: 1,
                        message: "Success to delete"
                    });
                }
            });
        }
    },
    getId: async (req, res)=> {
        const reservationFind = await Reservation.findById(req.body.id);
        if (reservationFind) {
            res.status(200).json({
                status: 1,
                message: "Success to get",
                data: reservationFind
            });
        }else{
            res.status(200).json({
                status: 0,
                message: "Can't find this reservation",
               
            });
        }
    },
    getAll: async (req, res)=> {
        // const reservationFind = await Reservation.find();
        const Room = Reservation.aggregate([
            {
                "$lookup" : {
                    "from": "customers",
                    "localField": "customer",
                    "foreignField": "_id",
                    "as": "customer_data"
                }
            }
        ]).exec((err, rooms) => {
            if (err) {
                res.status(200).json({
                    status: 0,
                    message: err
                });
            }else{
                res.status(200).json({
                    status: 1,
                    message: "Success to get",
                    data: rooms
                });
            }
            
        });
    },


}
