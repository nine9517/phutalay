const express = require('express');
const router = express.Router();
const EmployeeController= require('../controllers/employee');

router.route('/addEmployee').post(EmployeeController.insert);

module.exports = router;