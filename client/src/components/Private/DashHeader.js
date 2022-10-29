import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUsers} from "@fortawesome/free-solid-svg-icons"
//import axios from 'axios'
import { useEffect } from 'react'
//import Navbar from './Navbar' <Navbar />
import useAuth from '../../hooks/useAuth'
import './DashHeader.css'

import { useSendLogoutMutation } from '../../features/Auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

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
    const onUsersClicked = () => navigate('/dash/users')

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="dash-header-nav-buttons"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon className="icon_dash__nav" icon={faUsers} />
                    Users
                </button>
            )
        }
    }

    const logoutButton = (
        <button
            className="dash-header-nav-buttons"
            title="Logout"
            onClick={onLogoutClicked}
        >   
            <FontAwesomeIcon className="icon_dash__nav" icon={faRightFromBracket} />
            Logout
        </button>

    )


    const content = (

        <header className="dash-header">
            <div className={`dash-header-container ${dashClass}`}>
                <Link to="/dash" >
                    <h1 className="dash-header__title">Frap CRM</h1>
                </Link>
                <nav className="dash_header__nav">
                    <div className="dash_header__big_menu">
                        {userButton}
                    </div>
                    <div className="dash_header__small_menu">
                        {logoutButton}
                    </div>
                </nav>
            </div>
        </header>
    )



    return content
}

export default DashHeader