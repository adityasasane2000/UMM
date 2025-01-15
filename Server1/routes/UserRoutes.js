const express = require('express');
const userRouter = express.Router();
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');

userRouter.get("/home",async(req,res) => {
    res.send("Hello from Aditya!");
});


userRouter.get("/aboutus",async(req,res) => {
    res.send("Hello from About!");
});

userRouter.post('/createNewUser',async (req,res)=>{    
    const newUser = new userModel(req.body);
    await newUser.save();
    res.json({
        success:true,
        message:"User created successfully!",
        user:newUser
    });
});

userRouter.post('/signin',async (req,res)=> {
    const user = req.body;
    const email = user.email;
    const password = user.password;

    const gotUser = await userModel.findOne({email});

    if(gotUser){
        if(gotUser.password === password){
            console.log("Sucessfully logedin!");
            
            const token = jwt.sign({userId:gotUser._id,role:gotUser.role},process.env.SECRET_KEY,{expiresIn: '1h'});

            res.json({
                success:true,
                message:"Sucess",
                token:token,
                empId:user.empId,
                role:gotUser.role,
            });
        }else{
            res.json({
                success:false,
                message:"Invalid credentials",
            });
        }
    }else{
        res.json({
            success:false,
            message:"User not found",
        });
    }

});



// userRouter.get('/getAllUser',async (req,res)=>{
//     const users = await userModel.find();
//     res.json(users);
// });

// userRouter.get('/getUserById/:userId',async (req,res)=>{
//     let userId = req.params.userId;
    
//     const user = await userModel.findOne({userId});
    
//     if(user){
//         res.json({user});
//     }

//     res.json("User Not Found with this id!");
// });

// userRouter.delete('/deleteUser/:id',async (req,res) => {
//     let empId = req.params.id;
    
//     const user = await userModel.findOne({empId:empId});
    
//     if(user){
//         await userModel.deleteOne({empId:empId});
//         console.log("Success");
//         res.json({
//             success : true,
//             message : "User Deleted Sucessfully!"
//         });
//     }else{
//         res.json({
//             success : false,
//             message : "User Not Found with this ID!"
//         });
//     }
// });


// // userRouter.delete('/deleteUser',async (req,res) => {

// //     const user = await userModel.findOne({userId});
    
// //     if(user){
// //         await userModel.deleteOne({userId});
// //         res.json("User deleted Sucessfully!");
// //     }

// //     res.json("User Not Found with this id!");
// // });

// userRouter.put('/updateUser/:id',async (req,res) => {
//     let empId = req.params.id;
//     console.log(empId);
    
//     const user = await userModel.findOne({empId});
//     console.log(user);
    
//     if(user){
//         await userModel.findOneAndUpdate({ empId }, req.body, { new: true });
//         return res.json("User Updated Sucessfully!");
//     }

//     return res.json("User Not Found with this id!");
// });


module.exports = userRouter;

