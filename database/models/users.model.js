//import sequelize
const sequelize = require("../db.config")

//import datatypes
const {DataTypes, DATE} = require("sequelize")

//import bcrypt js
const bcryptjs = require("bcryptjs")

//define model
exports.Users=sequelize.define("users",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    password:{
        type:DataTypes.STRING,
        set(pass){
            let newpassword=bcryptjs.hashSync(pass,5)
            this.setDataValue("password",newpassword)
        }
    }
},{
    freezeTableName:true,
    createdAt:true,
    updatedAt:true
});