import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'


const DashFooter = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('sv-eu', { timeStyle: 'long'}).format(date)

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { status, username } = useAuth()
    const onGoHomeClicked = () => navigate('/dash')

    let goHomeButton = null
    if(pathname !== '/dash') {
        goHomeButton = (
            <button 
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }
    const content = (
        <footer className="dash-footer" >
            {goHomeButton}
            <p> current user: {username} </p>
            <p> Status: {status} </p>
            <p>time: {today}</p>
        </footer>
    )
  return content
}
export default DashFooter