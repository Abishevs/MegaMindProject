import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
 
const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    
 
    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            });
            navigate("/dash");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
    
    return (
        <div className="login-box">
            <form onSubmit={Auth}>
                <p className="has-text-centered">{msg}</p>
                    <h1>Login</h1>
                    <div className="user-box">
                        <label>Email or Username</label>
                        <input type="text" className="input" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />               
                    </div>
                    <div className="user-box"> 
                        <label className="label">Password</label>
                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>            
                    <div className="button-center">
                        <button>Login</button>
                        <p className="btn-msg">or</p>
                        <Link to="/register">Register</Link>
                    </div>
                </form>                 
        </div>
    )
}
 
export default Login