//import express module
const exp = require("express")

//calling express constructor
const app = exp()

//exposing to host port
app.listen(80,()=>{
    console.log("Server listening to port 80")
})

//invaid path middleware
app.use("*",(req,res,next)=>{
    res.send({message:"Invalid path"})
})

//Error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error occured",error:err.message})
})