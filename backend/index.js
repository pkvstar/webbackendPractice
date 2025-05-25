const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model/user'); 
mongoose.connect("mongodb://127.0.0.1:27017/practice").then(()=>{
    console.log("Connected to MongoDB");
})

app.use(cors()); // Enable CORS for all routes

// to read data from the request body

const users = [{name:"John Doe", age: 30}, {name:"Jane Doe", age: 25}];
app.get("/",(req, res) => {
    res.json({msg:"Hello"});
})
// app.get("/user/:person", (req, res) => {
//     let person = req.params.person;
//     res.json({msg:users[person]});
// })
// app.get("/users", (req, res) => {
//     res.json({msg:users});
// })
app.use(express.urlencoded({ extended: true })); //middleware to parse urlencoded data
function Chalo(req,res,next){
    console.log("Middleware called");
    next();
}
app.get("/register",(req,res)=>{
    const data = req.query;
    console.log(data);
    res.json({msg:"Register"});
})
app.post("/register",async (req,res)=>{
    let user = req.body;
    //? create
    const dbUser = await User.create({
        email: user.email,
        name: user.name,
        password: user.password
    });
    // console.log(user);
    // console.log("db ka kaam");
    res.json({msg:"User registered successfully", dbUser});
})
app.get("/users",async (req,res)=>{
    //? read
    const dbUsers = await User.find();
    res.json({msg:"Users fetched successfully", dbUsers});
})
app.get("/user/:person",async (req,res)=>{
    //? read
    console.log("entered")
    console.log(req.params.person);
    const dbUsers = await User.findOne({name: req.params.person});
    res.json({msg:"Users fetched successfully", dbUsers});
})
app.post("/user/update",async (req,res)=>{
    const data = req.body;
    //? update
    const dbUser = await User.findOneAndUpdate(
        {name: req.body.name},
        {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        },
        {new: true} // returns the updated document
    );
    res.json({msg:"User updated successfully", dbUser});
})
app.post("/user/delete",async (req,res)=>{
    const data = req.body;
    //? delete
    const dbUser = await User.findOneAndDelete(
        {name: req.body.name}
    );
    res.json({msg:"User deleted successfully", dbUser});
});  
// app.get("*",(req,res)=>{
//     res.status(404).json({msg:"404 Not Found"});
// })

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});