const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const path = require('path');
require('dotenv').config();
require('./helpers/init_mongodb')  //mongoDB connection handler



//initialize app
const app = express();
app.use(express.static('public'));

// Routes 

const ToDoRouter = require('./routes/ToDo');














//env variables
const PORT = process.env.PORT || 5000;


//Use in initialization
// app.use(express.static('/dist/minimal-ICTAK'));
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});



//Use route

app.use('/todo', ToDoRouter);

















// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname + '/dist/minimal-ICTAK/index.html'));
// });





//-------------PORT Listening -------//





app.listen(PORT, () => {
    console.log(`.....SERVER started at ${PORT}`)
});