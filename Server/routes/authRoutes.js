import express from 'express'
const authRouter = express.Router()
import {refresh, login, register, logout} from '../controllers/AuthController.js'
import {loginLimiter} from '../middleware/loginLimiter.js'
import {verifyJWT} from '../middleware/verifyJWT.js'
import { getUsers } from '../controllers/UsersController.js'



authRouter.route('/')
    .post(login)

/*authRouter.route('/users')
    .get(getUsers) //verifyJWT)
*/
authRouter.route('/refresh')
    .get(refresh) 

authRouter.route('/logout')
    .post(logout)

authRouter.route('/register')
    .post(register)


export default authRouter;