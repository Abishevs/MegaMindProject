import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket, faUsers, faCircleUser, faHouse } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from 'react'
import useAuth from '../../hooks/useAuth'



import { useSendLogoutMutation } from '../../features/Auth/authApiSlice'

const DASH_REGEX = /^\/dash(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin, status, fullname } = useAuth()

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

    const dashboardButton = (
        <Link to="/dash">
        <button
            className="dash-header-nav-buttons"
            
            
        >
            <FontAwesomeIcon className="icon_dash__nav" icon={faHouse} />
            Dashboard
        </button>
        </Link>

    )


    const content = (

        <header className="dash-header">
            <div className={`dash-header-container ${dashClass}`}>
                
                    <h1 className="dash-header__title">Frap CRM</h1>
                
                <nav className="dash_header__nav">
                    <div className="dash_header__big_menu">
                        {dashboardButton}
                        {userButton}
                    </div>
                    <div className="dash_header__small_menu">
                        {logoutButton}
                    </div>
                </nav>
                <div className="dash_profile">
                    <div className="dash_profile_icon">
                        <FontAwesomeIcon className="profile_icon" icon={faCircleUser} />
                    </div>
                    <div className="dash_profile_desc">
                        <h2>{fullname}</h2>
                        <h3>Role: {status}</h3>
                    </div>
                </div>
            </div>
        </header>
    )



    return content
}

export default DashHeader