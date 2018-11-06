const bcrypt = require('bcryptjs');
const User = require('../models/user');


module.exports = {

	register: async (req, res) => {
		const salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(req.body.password, salt);

		const userSchema = new User({
			username: req.body.username,
			password: hash,
			email: req.body.email,
			picture: req.body.picture,
		});

		const FindUser = await User.findOne({ username: req.body.username });
		
		if (FindUser) {
			res.status(200).json({ "status": "0", "message": "Username is already to use !!" });
		}
		else {
			userSchema.save((err) => {
				if (err) {
					console.log(err);
					res.status(200).json({ "status": "0", "message": "Fail to insert user" });
				} else {
					res.status(200).json({ "status": "1", "message": "Success to insert user" });
				}
			});
		}


	},
	login: async (req, res) => {

		const FindUser = await User.findOne({ username: req.body.username });

		if (FindUser) {
			const canLogin = await bcrypt.compareSync(req.body.password, User.password);

			if (canLogin) {
				res.status(200).json({ "status": "1", "message": "Login success by username : " + User.username });
			} 
			else {
				res.status(200).json({ "status": "0", "message": "Password is wrong !!" });
			}
		} 
		else {
			res.status(200).json({ "status": "0", "message": "Username isn't found !!" });
		}
	}

}