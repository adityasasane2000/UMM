const express = require('express');
const dotenv = require('dotenv');
const dbConnection = require('./config/dbConnection');
const cors = require('cors');

const app = express();
const userRouter = require('./routes/UserRoutes');
dotenv.config();

dbConnection();

app.use(cors());
app.use(express.json());
app.use("/auth",userRouter);

app.listen(8000,()=>{
    console.log("Server Started!");
})