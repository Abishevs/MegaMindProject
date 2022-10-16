import { Link } from 'react-router-dom'
//import Navbar from './Navbar' <Navbar />

const DashHeader = () => {

    const content = (
        <header>
            <div className="dash-header-container"> 
                <Link to="/dash" >
                    <h1 className="dash-header__title">Frap CRM</h1>
                </Link>
                
            </div>
        </header>
    )
  return content
}

export default DashHeader