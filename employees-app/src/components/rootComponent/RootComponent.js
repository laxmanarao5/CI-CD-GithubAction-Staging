import React from 'react'
import { Outlet } from 'react-router-dom'

const RootComponent = () => {
  return (
    <div>
    <h1>Dev environment triggers </h1>
        <Outlet/>
    </div>

  )
}

export default RootComponent
