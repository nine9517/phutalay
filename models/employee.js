const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	name : {
		type: String,
		required: true,
		unique: true,
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
    },
    position:{
        type : String,
        required : true
    },
    salary: {
        type : Number,
        required : true
    },
    status: {
        type : String,
        required : true
    }

});


const Employee = mongoose.model('employee',EmployeeSchema);

module.exports = Employee;