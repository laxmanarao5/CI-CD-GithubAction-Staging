
//import models
const expressAsyncHandler = require("express-async-handler")
const {Employees}=require("../database/models/employees.model")
const {Roles}=require("../database/models/roles.model")
const {Users}=require("../database/models/users.model")


//One to One Association between Employees and Users
Employees.Users=Employees.hasOne(Users,{foreignKey:"empId"})

//Many to one Association between Employess and Roles
Employees.Roles = Employees.belongsTo(Roles)

//One to Many Association between Roles and Employees
Roles.Employees = Roles.hasMany(Employees,{foreignKey:"roleId"})

//test controller
exports.test = (req,res)=>{
     res.send({message:"Employees API working fine"})
}

//registration controller
exports.register =expressAsyncHandler((req,res)=>{
    
})