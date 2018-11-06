const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8020;
var path = require('path');

require('./helpers/mongohelper')(mongoose);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes/users.js'));
app.use(require('./routes/rooms.js'));
app.use(require('./routes/customers.js'));
app.use(require('./routes/employees.js'));
app.use(require('./routes/reservations.js'));
app.use(require('./routes/getRoomtypeBydate'));

app.get('/',(req,res)=>{
    res.render('reservation');
});

app.get('/login',(req,res)=>{
    res.render('login');
});


 var server = app.listen(port, function() {
    console.log('Phutalay Server is running on port '+port+' at '+new Date());
});


