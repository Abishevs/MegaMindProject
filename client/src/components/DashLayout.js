import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import Dashboard from './Dashboard'


const DashLayout= () => {
  return (
    <>
        <DashHeader />
        <div className="dash-container">
            <Outlet />
            <Dashboard />
        </div>
        <DashFooter />
    </>
  )
}

export default DashLayout