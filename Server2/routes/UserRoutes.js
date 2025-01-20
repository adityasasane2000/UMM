const express = require('express');
const userRouter = express.Router();
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const axios = require('axios');


userRouter.get('/getAllUser',async (req,res)=>{
    const users = await userModel.find();
    res.json(users);
});


userRouter.get('/getUserById/:empId',async (req,res)=>{
    let empId = req.params.empId;
    
    const user = await userModel.findOne({empId});
    
    if(user){
        res.json({user});
    }

    res.json("User Not Found with this id!");
});


userRouter.delete('/deleteUser/:id',async (req,res) => {
    let empId = req.params.id;
    
    const user = await userModel.findOne({empId:empId});
    
    if(user){
        await userModel.deleteOne({empId:empId});
        console.log("Success");
        res.json({
            success : true,
            message : "User Deleted Sucessfully!"
        });
    }else{
        res.json({
            success : false,
            message : "User Not Found with this ID!"
        });
    }
});


userRouter.put('/updateUser/:id',async (req,res) => {
    let empId = req.params.id;
    console.log(empId);
    
    const user = await userModel.findOne({empId});
    console.log(user);
    
    if(user){
        await userModel.findOneAndUpdate({ empId }, req.body, { new: true });
        return res.json("User Updated Sucessfully!");
    }

    return res.json("User Not Found with this id!");
});




// //Use Of AuthMicroservices
// userRouter.post('/createNewUser',async (req,res)=>{
//     const response = await axios.post("http://localhost:8000/users/auth/createNewUser",req.body);
//     return res.send(response);
// });

// userRouter.post('/signin',async (req,res)=> {
//     const response = await axios.post("http://localhost:8000/users/auth/signin",req.body);
//     return res.send(response);
// });


// userRouter.delete('/deleteUser',async (req,res) => {

//     const user = await userModel.findOne({userId});
    
//     if(user){
//         await userModel.deleteOne({userId});
//         res.json("User deleted Sucessfully!");
//     }

//     res.json("User Not Found with this id!");
// });


module.exports = userRouter;

