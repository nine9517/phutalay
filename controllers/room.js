const room = require('../models/room');

module.exports = {

    insert: async (req, res) => {
        console.log(req.body);

        const newRoom = new room({
            name: req.body.name,
            roomType: req.body.roomType,
            price: req.body.price,
            status: req.body.status,
            detail: req.body.detail
        })

        newRoom.save((err) => {
            if (err) {
                res.status(200).json({
                    status: 1,
                    message: err
                });
            } else {
                res.status(200).json({
                    status: 0,
                    message: 'Success'
                })
            }
        })
    },
    getRoom: async (req, res) => {
        const findRoom = await room.find({ roomType: req.body.roomType });
        console.log(req.body);

        if (findRoom) {
            res.status(200).json({
                status: 1,
                message: "get " + req.body.roomType,
                data: findRoom
            });
        }else{
            res.status(200).json({
                status: 0,
                message: "can't find this roomtype "
            });
        }
    },

    getAllRoomByType: async (req,res)=>{
        const rooms = await room.aggregate([
            {"$match":{"roomType":{"$in":req.body.type}}},
            { "$sort": { "roomType": 1 } },
            {"$group" : {
                "_id":"$roomType",
                "name" : { "$first": '$name' },
                "price" :{ "$first": '$price' },
                }
            }
        ]).exec();
        for (let i = 0; i < rooms.length; i++) {
            rooms[i].room = await room.find({ roomType: rooms[i]._id });
        }
        res.json({
            data: rooms
        })

        



    }

    
}