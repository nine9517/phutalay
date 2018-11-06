const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservations');

router.route('/addReservation').post(ReservationController.insert);
router.route('/add/reservation').post(ReservationController.insertRedirect);
router.route('/CheckIn').post(ReservationController.checkIn);
router.route('/CheckOut').post(ReservationController.checkOut);
router.route('/deleteReservation').post(ReservationController.delete);
router.route('/findReservation').post(ReservationController.getId);
router.route('/getReservation').get(ReservationController.getAll);


module.exports = router;