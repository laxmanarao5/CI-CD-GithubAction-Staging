//process.env.NODE_ENV = "test";
//import sequelize
const {sequelize}=require("../database/db.config")

//import app
const app = require("../app");

//import supertest
const request = require("supertest");
const { Employees } = require("../database/models/employees.model");

//seeding data before all
beforeAll(async () => {
    let response = await request(app).post("/employees/register").send({
        "firstName":"laxman",
        "lastName":"boddepalli",
        "email":"lakshmanarao5296@gmail.com",
        "salary":40000,
        "user":{
            "password":"Laxmana@123"
        }
    })

    });
    
    beforeEach(async () => {
      // seed with some data
       //await sequelize.query("INSERT INTO students(name,email,password,role,status)  VALUES ('Ravi','ravi@gmail.com','kjhg',1)");
    });
    
    afterEach(async () => {
    //   await sequelize.query("DELETE FROM students");
    });

    //Removing data after all
    afterAll(async () => {
        //deleting data inserted during tests
        await Employees.destroy({where:{
            email:"lakshmanarao5296@gmail.com"
        }})
    });


//Test for get all users API
test("Get all users API",async()=>{
        

        let response = await request(app).get("/admin/users").set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJsYXhtYW4iLCJsYXN0TmFtZSI6ImJvZGRlcGFsbGkiLCJlbWFpbCI6Imxha3NobWFuYTUyOTZAZ21haWwuY29tIiwic2FsYXJ5IjoiNDAwMDAiLCJyb2xlIjp7ImlkIjoiNSIsInJvbGVOYW1lIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIyLTAyLTI2VDE2OjM3OjQ4LjI0NFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTAyLTI2VDE2OjM3OjQ4LjI0NFoifSwiaWF0IjoxNjg1OTQwMDQ5fQ.ly1kbtadag_melYj-X3cQz7EOCyIXLBAM5ErVOSalLU")

        expect(response.status).toBe(200)
})

//Test for role assigning API
test("Role assignment API",async()=>{
        

    let response = await request(app).put("/admin/user/1/role/5").set("Authorization","Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJsYXhtYW4iLCJsYXN0TmFtZSI6ImJvZGRlcGFsbGkiLCJlbWFpbCI6Imxha3NobWFuYTUyOTZAZ21haWwuY29tIiwic2FsYXJ5IjoiNDAwMDAiLCJyb2xlIjp7ImlkIjoiNSIsInJvbGVOYW1lIjoiYWRtaW4iLCJjcmVhdGVkQXQiOiIyMDIyLTAyLTI2VDE2OjM3OjQ4LjI0NFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTAyLTI2VDE2OjM3OjQ4LjI0NFoifSwiaWF0IjoxNjg1OTQwMDQ5fQ.ly1kbtadag_melYj-X3cQz7EOCyIXLBAM5ErVOSalLU")

    expect(response.status).toBe(200)
})
