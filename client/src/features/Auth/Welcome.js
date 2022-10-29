import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import './Welcome.css'

const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('sv-eu', { dateStyle: 'long', timeStyle: 'short'}).format(date)
    const { username, isMod, isAdmin } = useAuth()
    const content = (
        <section className="Welcome">
              
            
            <h1>Welcome, {username}</h1>
            <p>{today}</p>

            {/*<p><Link to="/dash/contacts">View Contacts</Link></p>*/}

            {/*(isMod || isAdmin) && <p><Link to="/dash/users">View Users</Link></p> */} 

        </section>
    )
    return content
}

export default Welcome