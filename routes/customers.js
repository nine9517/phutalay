const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customer');

router.route('/addCustomer').post(CustomerController.insert);
router.route('/getCustomer').get(CustomerController.getAll);

module.exports = router;