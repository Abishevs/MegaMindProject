import express from 'express'
const authRouter = express.Router()
import {refresh, login, register, logout} from '../controllers/AuthController.js'
import {loginLimiter} from '../middleware/loginLimiter.js'
import {verifyJWT} from '../middleware/verifyJWT.js'




authRouter.route('/')
    .post(login)
    
authRouter.route('/refresh')
    .get(refresh,) //verifyJWT)

authRouter.route('/logout')
    .post(logout)

authRouter.route('/register')
    .post(register)


export default authRouter;