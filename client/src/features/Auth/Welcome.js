import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-us', { dateStyle: 'full', timeStyle: 'long'}).format(date)
    const { username, isAdmin } = useAuth()
    const content = (
        <section className="Welcome">
            <p>{today}</p>
            
            <h1>Welcome, {username}</h1>

            <p><Link to="/dash/contacts">View Contacts</Link></p>

            {{isAdmin} && <p><Link to="/dash/users">View Users</Link></p>}

        </section>
    )
    return content
}

export default Welcome