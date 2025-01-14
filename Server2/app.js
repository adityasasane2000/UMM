const express = require('express');
const dotenv = require('dotenv');
const dbConnection = require('./config/dbConnection');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
const userRouter = require('./routes/UserRoutes');

dotenv.config();

dbConnection();

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);

app.listen(8001,async()=>{
    console.log("Server Started! on 8001");
})
