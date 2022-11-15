import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link, } from 'react-router-dom';


import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
//import useAuth from "../../hooks/useAuth"

const Login = () => {

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    //const { NotAuthenticated } = useAuth()


    const navigate = useNavigate();
    const dispatch = useDispatch()





    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {

        userRef.current.focus()


    }, [])


    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { accesToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accesToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Unauhtorized')
            } else {
                setErrMsg(err.data?.msg)
            }
            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>


    const content = (
        <div className="container">
            <div className="login-box">
                <p ref={errRef} className={errClass} aria-live="assertive" >{errMsg}</p>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="user-box">
                        <label>Email or Username</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Username"
                            value={username}
                            onChange={handleUserInput}
                            //required
                            ref={userRef}
                            autoComplete="off"
                        />
                    </div>
                    <div className="user-box">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="input"
                            placeholder="******"
                            value={password}
                            onChange={handlePwdInput}
                        //required 
                        />
                    </div>
                    <div className="button-center">
                        <button>Login</button>
                        <label htmlFor="persist" className="form__persist">
                            <input
                                type="checkbox"
                                className="form__checkbox"
                                id="persist"
                                onChange={handleToggle}
                                checked={persist}
                            />
                            Trust This Device
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
    //if (NotAuthenticated === true)
    return content
}

/*
   const Auth = async (e) => {
       e.preventDefault();
       try {
           await axios.post('http://localhost:5000/auth/', {
               username: email,
               password: password
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
*/
export default Login