//import express
const exp=require("express")

//create router
const adminApp=exp.Router()

//import middleware
const { adminPrivateRoute } = require("../middlewares/admin.middleware")

//import controllers
const {getAllUsers, assignRole} = require("../controllers/admin.controller")

//Route to get all users
adminApp.get("/users",adminPrivateRoute,getAllUsers)

//Route to assign role
adminApp.put("/user/:userId/role/:roleId",adminPrivateRoute,assignRole)


//export router
module.exports = adminApp