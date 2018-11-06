const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const ReservationSchema = new Schema({
	customer : Schema.ObjectId,
	employee : Schema.ObjectId,
    room : [Schema.ObjectId],
    total: {
        type: Number,
        require: true
    },
    remaining : {
        type : Number,
        required : true
    },
    roomType : [String],
    dateBooking : {
        dateCheckStart : Date,
        dateCheckEnd : Date,
        at : Date
    },
    dateCheckIn : {
        type : Date
    },
    dateCheckOut : {
        type : Date
    },
    brekage : [Schema.ObjectId],
    status : Number
});


const Reservation = mongoose.model('reservation',ReservationSchema);

module.exports = Reservation;