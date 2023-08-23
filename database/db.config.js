//import dotenv and config method
require("dotenv").config()

//import sequelize
const {Sequelize}=require("sequelize")

//create instance
const sequelize=new Sequelize(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
    host:process.env.HOST,
    dialect:"mssql",
    logging:false
    }
    )

//Syncing with db
sequelize.sync()

//export sequelize connection
module.exports=sequelize