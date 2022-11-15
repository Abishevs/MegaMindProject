import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/Auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isMod = false
    let isAdmin = false
    let status = "customer"
    let NotAuthenticated = true
    
    

    if (token) {
        const decoded = jwtDecode(token)
        const { fullname, username, roles } = decoded.UserInfo

        if (decoded.UserInfo) NotAuthenticated = false
        
        isMod = roles.includes('moderator')
        isAdmin = roles.includes('admin')
        
        if (isMod) status = "moderator"
        if (isAdmin) status = "admin"

        return { fullname, username, roles, status, isMod, isAdmin, NotAuthenticated }
    }

    return { fullname: '', username: '', roles: '', isMod, isAdmin, status }
}
export default useAuth