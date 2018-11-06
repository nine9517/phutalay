const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
	name : {
		type: String,
		required: true,
		lowercase: true
	},
	gender : {
		type: String,
        required: true,
        lowercase: true
	},
	idCard : {
		type: String,
		required: true,
		unique: true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }

});


const Customer = mongoose.model('customer',CustomerSchema);

module.exports = Customer;