const mongoose = require("mongoose");


const connectToDB =  async () =>{
    try {
        const url = process.env.URL;
        await mongoose.connect(url);
        console.log("Database Connected Sucessfully!");  
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDB;
