import { Outlet } from 'react-router-dom'
//import React from 'react'

import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import DashNav from './DashNav'




const DashLayout= () => {
   
  return (
    <>  
        <div className="dash-container">
        <DashNav />
        <DashHeader />
            <Outlet />
        <DashFooter />
        </div>
    </>
  )
}

export default DashLayout