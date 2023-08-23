//import express
const exp=require("express")

//create router
const adminApp=exp.Router()

//import middleware
const { adminPrivateRoute } = require("../middlewares/admin.middleware")

//import controllers
const {getAllUsers, assignRole,getAllUsersWithSearchKey,getAllRoles} = require("../controllers/admin.controller")

//Route to get all users
adminApp.get("/users",adminPrivateRoute,getAllUsers)

//Route to assign role
adminApp.put("/user/:userId/role/:roleId",adminPrivateRoute,assignRole)

//Route to get all users with name,email and role
adminApp.get("/users/:search_key",adminPrivateRoute,getAllUsersWithSearchKey)

adminApp.get("/roles",adminPrivateRoute,getAllRoles)

//export router
module.exports = adminApp