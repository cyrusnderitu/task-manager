import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Loading .env file file variables (MONGO_URI, PORT, JWT_SECRET)
dotenv.config();

// Express JS instance 
const app = express()

// Applying middlewears within the app instance
app.use(cors(
    {
    origin: 'http://localhost:3000', // your frontend
    credentials: true,
  }
));
app.use(express.json())  // This allows backend to understand JSON request bodies
app.use(cookieParser()); // This allows backend to understand cookies

// Initialise the route to registering i.e. localhost/api/auth/<register> - route mentioned in the routes authRoute
app.use('/api/auth', authRoutes);

// Test route
app.get ('/', (req, res)=>{
    res.send("....API is running")
});

// Port and DB Setup
const port = process.env.PORT

// Connecting to the Mongo DB Database
// Create a a promise of once the connect at the given port it should reply with a conncetion succes
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongo DB Connected")
    app.listen(port, ()=> console.log(`Server listening on port ${port}`))
})
// A way to deal with errors if any are found
.catch((err)=> console.log(err))