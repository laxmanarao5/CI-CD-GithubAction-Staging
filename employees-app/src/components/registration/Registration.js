import React from 'react'

const Registration = () => {
  return (
    <div className='m-5 '>
        <div className='w-25 mx-auto shadow rounded p-3 '>

            {/* Registration form */}
            <form className='form mt--5'>

            {/* First name input field */}
            <div className='m-3'>
                <input type="text" className='form-control' placeholder='First name'/>
            </div>

            {/* last name input field */}
            <div className='m-3'>
                <input type="text" className='form-control' placeholder='Last name'/>
            </div>

            {/* Email input field */}
            <div className='m-3'>
                <input type="text" className='form-control' placeholder='Email address'/>
            </div>

            {/* Password input field */}
            <div className='m-3'>
                <input type="password" className='form-control' placeholder='Enter password'/>
            </div>

            {/* Confirm Password input field */}
            <div className='m-3'>
                <input type="password" className='form-control' placeholder='Confirm password'/>
            </div>

            {/* Button for submission */}
            <div className='m-3'>
                <button className='btn btn-success d-block w-100 mx-auto'>Sign Up</button>
            </div>

            </form>
        </div>
    </div>
  )
}

export default Registration