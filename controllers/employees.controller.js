
//import models
const expressAsyncHandler = require("express-async-handler")
const {Employees}=require("../database/models/employees.model")
const {Roles}=require("../database/models/roles.model")
const {Users}=require("../database/models/users.model")

//import dotenv and config method
require("dotenv").config()

//import bcryptjs
const bcryptjs = require("bcryptjs")

//import json web tokens
const jwt=require("jsonwebtoken")

//One to One Association between Employees and Users
Employees.Users = Employees.hasOne(Users,{foreignKey:"empId"})
// Users.Employees = Users.belongsTo(Employees,{foreignKey:"empId"})

//Many to one Association between Employess and Roles
Employees.Roles = Employees.belongsTo(Roles)

//One to Many Association between Roles and Employees
Roles.Employees = Roles.hasMany(Employees,{foreignKey:"roleId"})

//test controller
exports.test = (req,res)=>{
     res.send({message:"Employees API working fine"})
}


//registration controller

exports.register =expressAsyncHandler(async(req,res)=>{
    
    //check wheather email exist or not
    let emailFromDb=await Employees.findOne({where:{
        email:req.body.email
    }})

    if(emailFromDb === null)
    {
        //Insert data into database
        let result=await Employees.create(req.body,{include:{
            association:Employees.Users
        }
        })

        //send response
        res.status(201).send({message:"User created successfully"})
    }

    else
    {
        res.send({message:"Email already exists"})
    }
    
    
})


//Login controller

exports.login = expressAsyncHandler(async(req,res) => {

    //check wheather email exist or not
    let userData=await Employees.findOne({where:{
        email:req.body.email
    },include:[
        {association:Employees.Users},
        {association:Employees.Roles}
    ]
    })
    //user not registered
    if(userData === null)
    {
        res.send({message:"User not yet registered"})
    }
    else
    {
        //checking for password match
        if(await bcryptjs.compare(req.body.password,userData.user.password))
        {
            //reformating response from DB to JSON object
            userData=userData.toJSON()
            delete userData.id
            delete userData.roleId
            delete userData.createdAt
            delete userData.updatedAt
            delete userData.user

            //generate toekn
            let signedToken = jwt.sign(userData,process.env.SECRET_KEY)

            //send token as response
            res.send({message:"Login Successful",token:signedToken})
        }

        //password is not valid
        else
        {
            //response for invalid password
            res.send({message:"Invalid password"})
        }

    }
})