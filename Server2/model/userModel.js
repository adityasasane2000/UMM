const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    empId:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['employee', 'admin'], // Possible values for role
        default: 'employee'
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("UserData",userSchema);

module.exports = userModel;