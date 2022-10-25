import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/Auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isMod = false
    let isAdmin = false
    let status = "customer"

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isMod = roles.includes('moderator')
        isAdmin = roles.includes('admin')
        
        if (isMod) status = "moderator"
        if (isAdmin) status = "admin"

        return { username, roles, status, isMod, isAdmin }
    }

    return { username: '', roles: [], isMod, isAdmin, status }
}
export default useAuth