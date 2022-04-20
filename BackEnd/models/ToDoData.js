const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({

     content: {
        type: String,
        // required: true
    },
    status:{
        type:Boolean
    },
   
    creation_date:Date


});

var ToDoDATA = mongoose.model('ToDoData', ToDoSchema);

module.exports = ToDoDATA;