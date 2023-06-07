import React from 'react'

const Login = () => {
  return (
    <div>
        <div className='w-50 mx-auto shadow rounded p-3 '>

            {/* Log In form */}
            <form className='form mt--5'>

              {/* Email input field */}
              <div className='m-3'>
                <input type="text" className='form-control' placeholder='Email address'/>
              </div>

              {/* Password input field */}
              <div className='m-3'>
                <input type="password" className='form-control' placeholder='password'/>
              </div>

              {/* Button for submission */}
              <div className='m-3'>
                <button className='btn btn-primary d-block w-100 mx-auto'>Log In</button>
              </div>

            </form>
        </div>
    </div>
  )
}

export default Login