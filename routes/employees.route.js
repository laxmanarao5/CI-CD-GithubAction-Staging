//import express
const exp=require("express")

//create router
const employeesApp=exp.Router()

//import controllers
const {test}=require("../controllers/employees.controller")


//test route
employeesApp.get("/test",test)

//export API router
module.exports=employeesApp
