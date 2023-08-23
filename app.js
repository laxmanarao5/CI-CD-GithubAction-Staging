//import express module
const exp = require("express")

//calling express constructor
const app = exp()


const cors=require("cors")

app.use(cors())


//connect react build with nodejs web server
const path=require("path")
app.use(exp.static(path.join(__dirname,"./employees-app/build")))

//exposing to host port
// app.listen(80,()=>{
//     console.log("Server listening to port 80")
// })

//import sequelize
const sequelize=require("./database/db.config")

sequelize.authenticate()
.then(()=>console.log("DB Connection successful"))
.catch(err=>console.log("Error occured : ",err.message))



//import API  routes
const employeesApp=require("./routes/employees.route")
const adminApp = require("./routes/admin.route")

//routing to Employee API
app.use("/employees",employeesApp)
app.use("/admin",adminApp)





//invaid path middleware
app.use("*",(req,res,next)=>{
    res.send({message:"Invalid path"})
})

//Error handling middleware
app.use((err,req,res,next)=>{
    res.send({message:"Error occured",error:err.message})
})

module.exports = app