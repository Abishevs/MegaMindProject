import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();


    const Register = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                username: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }


    return (

        <div className="login-box">
            <form onSubmit={Register}>
                <h1>Register</h1>
                <p className="">{msg}</p>
                <div className="user-box">
                    <label>Name</label>
                    <input text="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="user-box">
                    <label>Email</label>
                    <input text="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="user-box">
                    <label>password</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="user-box">
                    <label>Confirm Password</label>
                    <input type="password"
                        value={confPassword}
                        onChange={(e) => {
                            setConfPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="button-center">
                    <button>Register</button>
                    <p className="btn-msg">Already have an acount?</p>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>

    );
}

export default Register