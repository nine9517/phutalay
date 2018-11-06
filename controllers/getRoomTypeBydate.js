const Reservation = require('../models/reservation');
const Room = require('../models/room');
module.exports = {
    getBydate: async (req, res) => {
        let dateS = new Date(parseInt(req.body.start));
        let dateE = new Date(parseInt(req.body.end));
        const test = Reservation.aggregate([
            
            { "$unwind": "$roomType" },
            {
                "$match": {
                    "$or": [
                        { "dateBooking.dateCheckStart": { "$gte": dateS, "$lte": dateE } },
                        { "$and": [
                            { "dateBooking.dateCheckStart": { "$lte": dateS } },
                            { "dateBooking.dateCheckEnd": { "$gte": dateE } }
                        ] },
                        { "$and": [
                            { "dateBooking.dateCheckStart": { "$gte": dateS } },
                            { "dateBooking.dateCheckEnd": { "$lte": dateE } }
                        ] },
                        { "dateBooking.dateCheckEnd": { "$gte": dateS, "$lte": dateE } }
                    ]
                }
            },
            { "$sort": { "roomType": 1 } },

            {"$group" : {
                "_id":"$roomType",
                "count":{"$sum":1}
                }
            },
            { "$sort": { "roomType": 1 } }
        ]).exec((err, rooms) => {
           
            if (err) {
                
                res.status(200).json({
                    status: 0,
                    message: err
                });
            } else {
                Room.aggregate([
                    { "$sort": { "roomType": 1 } },
                    {"$group" : {
                        "_id":"$roomType",
                        "price" : { "$first": '$price' },
                        "count":{"$sum":1}
                        }
                    },
                    { "$sort": { "roomType": 1 } }
                ]).exec((err, types)=>{
                    for (let i = 0; i < types.length; i++) {
                        types[i].use = 0;
                        for (let j = 0; j < rooms.length; j++) {
                            if(rooms[j]._id==types[i]._id){
                                types[i].use = rooms[j].count;
                                break;
                            }
                        }
                    }
                    res.status(200).json({
                        status: 1,
                        message: "Success to get",
                        data: types
                    });
                });
               
            }

        });

    },


}