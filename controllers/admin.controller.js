const expressAsyncHandler = require("express-async-handler");
const { Employees } = require("../database/models/employees.model");

//controller to get all users
exports.getAllUsers = expressAsyncHandler(async(req,res)=>{
    let result = await Employees.findAll({include:{
        association:Employees.Roles
    }})
    res.send({message:"All users",payload:result})
})

//controller to assign role
exports.assignRole = expressAsyncHandler(async(req,res)=>{
    let result = await Employees.update({roleId:req.params.roleId},{where:{
        id:req.params.userId
    }})

    res.send({message:"Role assigned"})
})