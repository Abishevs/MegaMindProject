import { Link } from 'react-router-dom'


const Welcome = () => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-us', { dateStyle: 'full', timeStyle: 'long'}).format(date)

    const content = (
        <section className="Welcome">
            <p>{today}</p>
            
            <h1>Welcome, {/*user variable*/}</h1>

            <p><Link to="/dash/contacts">View Contacts</Link></p>

            <p><Link to="/dash/users">View Users</Link></p>

        </section>
    )
    return content
}

export default Welcome