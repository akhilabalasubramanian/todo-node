const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:'Task cant be empty'
    }
    // Mail:{
    //     type:String,
    //     required:'Valid email required'
    // }
     
});
mongoose.model('Task', taskSchema);