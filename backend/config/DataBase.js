const mongoose = require('mongoose');

const connectDB = async() => {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URI);
       console.log("mongodb was connected successfully");
    
    } catch(error) {
        console.log("not connected to mongodb");
        exit(1);
    }
}

module.exports = connectDB;