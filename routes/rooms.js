const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/room');

router.route('/addRoom').post(RoomController.insert);
router.route('/getTypeRoom').post(RoomController.getRoom);

router.route('/getroombytype').post(RoomController.getAllRoomByType);

module.exports = router;