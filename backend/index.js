const express = require('express');
const app = express();

// to read data from the request body

const users = [{name:"John Doe", age: 30}, {name:"Jane Doe", age: 25}];
app.get("/",(req, res) => {
    res.json({msg:"Hello"});
})
app.get("/user/:person", (req, res) => {
    let person = req.params.person;
    res.json({msg:users[person]});
})
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
app.post("/register",Chalo ,(req,res)=>{
    let user = req.body;
    console.log(user);
    console.log("db ka kaam");
    res.json({msg:"User registered successfully", user});
})
// app.get("*",(req,res)=>{
//     res.status(404).json({msg:"404 Not Found"});
// })

app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});