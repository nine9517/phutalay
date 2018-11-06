const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

const UserSchema = new Schema({
	username : {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password : {
		type: String,
		required: true
	},
	email : {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	picture : {
		type : String,
	}
	
}, { 
	timestamps: { 
		createdAt: 'create_at' ,
		updatedAt: 'update_at'
	}
});

UserSchema.methods.isValidPassword = async function(newPassword) {
	try{
		return await bcrypt.compare(newPassword,this.password);
	} catch(error) {
		throw new Error(error);
	}
}

const User = mongoose.model('user',UserSchema);

module.exports = User;