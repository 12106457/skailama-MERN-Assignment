const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db-config/db");
dotenv.config();

const authRoute=require("./routes/authRoute");
const projectRoute=require("./routes/projectRoute");
const fileRoute=require("./routes/fileRoute");

connectDB();

const app=express();
app.use(express.json());
app.use(cors());
app.use("/auth",authRoute);
app.use("/project",projectRoute);
app.use("/file",fileRoute);
app.get("/",(req,res)=>{
    res.send("Welcome to Backend Server")
})


const PORT =5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

