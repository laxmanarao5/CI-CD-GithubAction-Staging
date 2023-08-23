//import dotenv
require("dotenv").config()

//import jwt
const jwt=require("jsonwebtoken")

exports.adminPrivateRoute=(req,res,next)=>{
    if(req.headers.authorization!=undefined)
    {
        let [bearer,token]=req.headers.authorization.split(" ")
        try{
            //verifying jwt token
           let result=jwt.verify(token,process.env.SECRET_KEY)

            //if valid token send req to next middleware else generate an error
            if(result.role.roleName=="admin"){
                // req.gdo.email=result.email
                next()
            }
           
            else
            res.send({message:"Unautherized acces"})
        }
        catch{
            //if error occured means token expired
            res.send({message:"Token expired Relogin"})
        }
    }
    else
    {
        res.send({message:"Unauthorized request"})
    }
}