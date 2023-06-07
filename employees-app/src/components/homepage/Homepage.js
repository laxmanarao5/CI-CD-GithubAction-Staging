import React from 'react'
import Login from '../login/Login'
import ProjectLogo from './ProjectLogo'

function Homepage() {
  return (
    <div>
        <div className='row m-5'>
            <div className='col-6'>
                <ProjectLogo/>
            </div>
            <div className='col-6'>
                    <Login/>
            </div>

        </div>
    </div>
  )
}

export default Homepage