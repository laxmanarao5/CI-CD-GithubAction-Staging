//process.env.NODE_ENV = "test";
//import sequelize
const {sequelize}=require("../database/db.config")

//import app
const app = require("../app");

//import supertest
const request = require("supertest");
const { Employees } = require("../database/models/employees.model");

beforeAll(async () => {
    //   console.log("before all");
    //   await sequelize.query(
    //     "CREATE TABLE students (user_id int PRIMARY KEY auto_increment, name varchar(200),email varchar(200),password varchar(100),role varchar(100),status tinyint(1))"
    //   );
    });
    
    beforeEach(async () => {
      // seed with some data
       //await sequelize.query("INSERT INTO students(name,email,password,role,status)  VALUES ('Ravi','ravi@gmail.com','kjhg',1)");
    });
    
    afterEach(async () => {
    //   await sequelize.query("DELETE FROM students");
    });
    
    afterAll(async () => {
        //deleting data inserted during tests
        await Employees.destroy({where:{
            email:"lakshmanarao5296@gmail.com"
        }})
    });


//test for registration
test("Testing registration API",async()=>{
        let response = await request(app).post("/employees/register").send({
            "firstName":"laxman",
            "lastName":"boddepalli",
            "email":"lakshmanarao5296@gmail.com",
            "salary":40000,
            "user":{
                "password":"Laxmana@123"
            }
        })

        

        expect(response.status).toBe(201)
})

//Test for login

test("Testing Login API",async()=>{
    let response = await request(app).post("/employees/login").send({
        "email":"lakshmanarao5296@gmail.com",
        "password":"Laxmana@123"
    })

    expect(response.status).toBe(200)
})