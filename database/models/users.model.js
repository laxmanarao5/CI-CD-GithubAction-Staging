//import sequelize
const sequelize=require("../db.config")

//import datatypes
const {DataTypes, DATE}=require("sequelize")

//define model
exports.Users=sequelize.define("users",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    empId:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    password:{
        type:DataTypes.STRING
    }
},{
    freezeTableName:true,
    createdAt:true,
    updatedAt:true
});