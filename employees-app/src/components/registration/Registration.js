import React from 'react'
import { useForm } from 'react-hook-form'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Registration = () => {

    const {handleSubmit,register,formState:{errors}}=useForm()
    let navigate = useNavigate()
    let [passwordMatch,setPasswordMatch]=useState(true)

    const handleRegistration =async (user) =>{
        if(user.password!== user.password2)
        {
            setPasswordMatch(false)
        }
        else{
            user.user={}
            user.user.password=user.password
            delete user.password
            delete user.password2
            let response =await axios.post("http://localhost/employees/register",user)
            console.log("Registration successfull");
            navigate("/")

        }
    }

    const handleRedirection = ()=>{
        navigate("/")
    }
  return (
    <div className='m-5 '>
        
        <div className='w-50 mx-auto shadow rounded p-3 '>
            <p className='text-success fs-2'>Registration</p>
            {/* Registration form */}
            <form className='form mt--5' onSubmit={handleSubmit(handleRegistration)}>

            {/* First name input field */}
            <div className='m-3'>
                {errors.firstName && <p className='text-danger'>First name is required</p>}
                <input type="text" className='form-control' {...register("firstName",{required:"First name is required"})} placeholder='First name'/>
            </div>

            {/* last name input field */}
            <div className='m-3'>
            {errors.lastName && <p className='text-danger'>Last name is required</p>}
                <input type="text" className='form-control' {...register("lastName",{required:"Last name is required"})} placeholder='Last name'/>
            </div>

            {/* Email input field */}
            <div className='m-3'>
            {errors.email && <p className='text-danger'>Email is required</p>}
                <input type="text" className='form-control' {...register("email",{required:"Email is required"})} placeholder='Email address'/>
            </div>

            {/* Password input field */}
            <div className='m-3'>
            {errors.password && <p className='text-danger'>Password is required</p>}
                <input type="password" className='form-control' {...register("password",{required:"Password is required"})} placeholder='Enter password'/>
            </div>

            {/* Confirm Password input field */}
            <div className='m-3'>
                {passwordMatch === false && <p className='text-danger'>Password did not matched</p>}
            {errors.password2 && <p className='text-danger'>Confirm Password is required</p>}
                <input type="password" className='form-control'  {...register("password2",{required:"Confirm Passowrd is required"})}  placeholder='Confirm password'/>
            </div>

            {/* Button for submission */}
            <div className='m-3'>
                <button className='btn btn-success d-block w-50 mx-auto'>Sign Up</button>
            </div>

            </form>
    <hr></hr>
            <div>
            <Link className='p-2 m-3 d-block w-50 mx-auto text-decoration-none fs-4' onClick={handleRedirection}>Click here Login</Link>
        </div>
        </div>
    </div>
  )
}

export default Registration