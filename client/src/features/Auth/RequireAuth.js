import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles, NotAuthenticated } = useAuth()
    
   
    const content = (
         
         allowedRoles.includes(roles)) && NotAuthenticated
            ?  <Navigate to="/login" state={{ from: location }} replace />
            : <Outlet />
        
        
    return content
    
}
export default RequireAuth