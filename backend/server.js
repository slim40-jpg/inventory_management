const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require('./config/DataBase');
const AuthRouter = require('./routes/AuthRoute');
const StockRouter = require('./routes/StockRoute');
const UserRouter = require('./routes/UserRoute');
dotenv.config()

connectdb();

const app = express();

app.use(cors());
app.use(express.json());


app.get('/' , async (req , res) => {
     console.log("welcome to our service");
     res.status(200).json({
        success: true,
        message: "welcome to our service",
     });
});
console.log("slakld")
app.use('/api/AuthRoute' , AuthRouter);
console.log("AuthRouter");

app.get('/api/health' , (req , res) =>{
    res.status(200).json({
         success: true,
         message: "server is running",
         Timestamp: new Date().toISOString()

    });
});
const auth = require('./middleware/AuthMiddleware');
app.use(auth);

app.use('/api/StockRoute' , StockRouter);
app.use('/api/UserRoute' , UserRouter);
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
app.listen(PORT , () => {
     console.log(`Server is running on ${PORT}`);
     console.log(`Environment : ${NODE_ENV}`);
     
});