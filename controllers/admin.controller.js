const expressAsyncHandler = require("express-async-handler");
const {Op} = require("sequelize")

const { Employees } = require("../database/models/employees.model");
const {Roles} = require("../database/models/roles.model")

//controller to get all users
exports.getAllUsers = expressAsyncHandler(async(req,res)=>{
    let result = await Employees.findAll({include:{
        association:Employees.Roles
    }})

    let foramtedOutput= result.map((user)=>{
        return {id:user.id,name:user.firstName+" "+user.lastName,email:user.email,role:user.role?.roleName}
    })
    res.send({message:"All users",payload:foramtedOutput})
})

//controller to assign role
exports.assignRole = expressAsyncHandler(async(req,res)=>{
    let result = await Employees.update({roleId:req.params.roleId},{where:{
        id:req.params.userId
    }})

    res.send({message:"Role assigned"})
})

//controller to get all users by name ,email and role
exports.getAllUsersWithSearchKey = expressAsyncHandler(async(req,res)=>{

    //Fetching role Ids from Roles table
    let roles = await Roles.findAll({where:{
        roleName : 
        {
            [Op.like]:`%${req.params.search_key}%`
        }
    },attributes:{
        exclude:["roleName","createdAt","updatedAt"]
    }})

    //Reformating result into array of Role 
    let roleIds = roles.map((role)=> +(role.dataValues.id))

    //Fetching users from 
    let result = await Employees.findAll({where:{
        [Op.or]:{
            firstName:{
                [Op.like]:`%${req.params.search_key}%`
            },
            lastName:{
                [Op.like]:`%${req.params.search_key}%`
            },
            email:{
                [Op.like]:`%${req.params.search_key}%`
            },
            roleId:{
                [Op.in]:roleIds
            }
        }
        
    },include:{
        association:Employees.Roles
    }})

        console.log(result);
    let formatedOutput= result.map((user)=>{
        return {id:user.id,name:user.firstName+" "+user.lastName,email:user.email,role:user.role?.roleName}
    })
    res.send({message:"All users",payload:formatedOutput})
})

//Get all roles
exports.getAllRoles = expressAsyncHandler(async(req,res)=>{
    let result = await Roles.findAll()

    res.send({message:"All roles are ",payload:result})
})