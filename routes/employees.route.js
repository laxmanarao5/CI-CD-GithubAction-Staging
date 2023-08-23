//import express
const exp=require("express")

//create router
const employeesApp=exp.Router()

//import controllers
const {test,register,login}=require("../controllers/employees.controller")

//body parser
employeesApp.use(exp.json())

//test route
employeesApp.get("/test",test)

//Registration route
employeesApp.post("/register",register)

//Registration route
employeesApp.post("/login",login)

//export API router
module.exports=employeesApp
