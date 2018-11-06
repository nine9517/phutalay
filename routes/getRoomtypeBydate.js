const express = require('express');
const router = express.Router();
const getRoomTypeBydateController = require('../controllers/getRoomTypeBydate');

router.route('/getRoomTypeBydate').post(getRoomTypeBydateController.getBydate);


module.exports = router;