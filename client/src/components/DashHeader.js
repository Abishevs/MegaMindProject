import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//import Navbar from './Navbar' <Navbar />

const DashHeader = () => {
    const navigate = useNavigate();
    
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    const content = (
        
        <header>
            <div className="dash-header-container"> 
                <Link to="/dash" >
                    <h1 className="dash-header__title">Frap CRM</h1>
                </Link>
                <Link onClick={Logout}><h1>Logout</h1></Link>
                
            </div>
        </header>
    )
    
   

  return content
}

export default DashHeader