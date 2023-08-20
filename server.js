import express from "express";
// import colors from 'colors';
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

// configure env
dotenv.config();

//database config means ham database ko connect kar dege
connectDB();

// rest object create karege taki ham api ko create kar paye
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth",authRoutes);

// rest api create karege
app.get("/", (req,res)=>{
    res.send("<h1>Welcome to ecommerce app</h1>")
})

// port
const port = process.env.PORT || 8080;

// run karege means listen karege
app.listen(port,()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on port ${port}`);
})