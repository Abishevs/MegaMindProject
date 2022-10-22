import { Link, useNavigate, useLocation} from 'react-router-dom'
//import axios from 'axios'
import { useEffect } from 'react'
//import Navbar from './Navbar' <Navbar />

import { useSendLogoutMutation } from '../features/Auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading, 
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onLogoutClicked = () => sendLogout()

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.message} </p>

    let dashClass = null 
    if (!DASH_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    const logoutButton = (
        <button 
            className=""
            title="Logout"
            onClick={onLogoutClicked}
        >
            <h2>Logout</h2>
        </button>
    )
    
   
    const content = (
        
        <header>
            <div className={`dash-header-container ${dashClass}`}> 
                <Link to="/dash" >
                    <h1 className="dash-header__title">Frap CRM</h1>
                </Link>
                <nav>
                    {logoutButton}
                </nav>
                
            </div>
        </header>
    )
    
   

  return content
}

export default DashHeader