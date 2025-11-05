const mongoose = require('mongoose');

const connectDB = async() => {
    try {
       const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://slimselmi33_db_user:Boj3Al8ZT3cQz3Sj@gestiondestock.g59dt49.mongodb.net/stock_management");
       console.log("mongodb was connected successfully");
    
    } catch(error) {
        console.log("not connected to mongodb");
        exit(1);
    }
}

module.exports = connectDB;