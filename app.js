//import express module
const exp = require("express")

//calling express constructor
const app = exp()

//exposing to host port
app.listen(80,()=>{
    console.log("Server listening to port 80")
})

//import sequelize
const sequelize=require("./database/db.config")

sequelize.authenticate()
.then(()=>console.log("DB Connection successful"))
.catch(err=>console.log("Error occured : ",err.message))



//import API  routes
const employeesApp=require("./routes/employees.route")

//routing to Employee API
app.use("/employees",employeesApp)





//invaid path middleware
app.use("*",(req,res,next)=>{
    res.send({message:"Invalid path"})
})

//Error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error occured",error:err.message})
})