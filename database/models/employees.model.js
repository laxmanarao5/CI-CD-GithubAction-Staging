//import sequelize
const sequelize=require("../db.config")

//import datatypes
const {DataTypes}=require("sequelize")

//define model
exports.Employees=sequelize.define("employees",{
    id:{
        type:DataTypes.BIGINT,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    salary:{
        type:DataTypes.BIGINT,
        allowNull:true
    },
    roleId:{
        type:DataTypes.BIGINT,
        allowNull:false
    }
},{
    freezeTableName:true,
    createdAt:true,
    updatedAt:true
});