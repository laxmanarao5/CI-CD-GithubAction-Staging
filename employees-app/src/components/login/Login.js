import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = () => {

  const {handleSubmit,register,formState:{errors}}=useForm()
  let navigate = useNavigate()
  let [loginError,setLoginError] = useState(false)
  const handleLogin = async(cred) =>{
    console.log(cred);
    try{
      let response = await axios.post("http://localhost/employees/login",cred)
      if(response.data.loginStatus === true)
      {
        sessionStorage.setItem("token",response.data.token)
        console.log(response.data.user);
        if(response.data.user.role?.roleName === "admin")
        navigate("/admin")
        else
        navigate("/member")
        
      }
      else{
        setLoginError(true)
      }
    }
    catch(err){
      console.log(err.message)
    }
   

    
  }
  return (
    <div>
        <div className='w-50 mx-auto shadow rounded p-3 '>

            {/* Log In form */}
            <form className='form mt--5' onSubmit={handleSubmit(handleLogin)}>
              {loginError && <p className='text-danger'> Invalid Credentials</p>}
              {/* Email input field */}
              <div className='m-3'>
                <input type="text" className='form-control' {...register("email")} placeholder='Email address'/>
              </div>

              {/* Password input field */}
              <div className='m-3'>
                <input type="password" {...register("password")} className='form-control' placeholder='password'/>
              </div>

              {/* Button for submission */}
              <div className='m-3'>
                <button className='btn btn-primary d-block w-100 mx-auto'>Log In</button>
              </div>

            </form>

            <div>
            <Link to="register"><button className='btn btn-success m-3'>Create new account</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Login