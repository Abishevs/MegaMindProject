import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons"


const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('sv-eu', { dateStyle: 'long', timeStyle: 'short'}).format(date)
    const { username, status } = useAuth()
    const content = (
        <section className="Welcome">
              
            
            <h1>Welcome back, {username}! How is our {status} doing today?</h1>
            <p><FontAwesomeIcon icon={faAnglesRight}/>{today}</p>

            {/*<p><Link to="/dash/contacts">View Contacts</Link></p>*/}

            {/*(isMod || isAdmin) && <p><Link to="/dash/users">View Users</Link></p> */} 

        </section>
    )
    return content
}

export default Welcome