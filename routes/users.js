const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');


router.route('/login').post(UsersController.login);
router.route('/register').post(UsersController.register);


module.exports = router;