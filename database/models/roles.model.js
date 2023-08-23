//import sequelize
const sequelize=require("../db.config")

//import datatypes
const {DataTypes, DATE}=require("sequelize")

//define model
exports.Roles=sequelize.define("roles",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    roleName:{
        type:DataTypes.STRING
    }
},{
    freezeTableName:true,
    createdAt:true,
    updatedAt:true
});