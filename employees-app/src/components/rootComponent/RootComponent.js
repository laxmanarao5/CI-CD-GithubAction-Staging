import React from 'react'
import { Outlet } from 'react-router-dom'

const RootComponent = () => {
  return (
    <div>
        <Outlet/>
    </div>

  )
}

export default RootComponent