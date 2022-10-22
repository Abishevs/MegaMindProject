import express from "express";
import { getUsers,  deleteUser, updateUser, updateUserPwd } from "../controllers/UsersController.js";
//import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
//import { authRoutes } from "./authRoutes"
//import  {login}  from '../controllers/authController.js'
import {loginLimiter} from '../middleware/loginLimiter.js'
import {verifyJWT } from '../middleware/verifyJWT.js'


const router = express.Router();

router.use(verifyJWT)
 
router.get('/users' , getUsers);
router.post('/users');
//router.post('/login', /*loginLimiter*/)
router.post('/login/auth')
router.put('/auth', );
router.get('/token', refreshToken);
//router.delete('/logout', );
router.put('/:username/edit', updateUser)
router.put('/:username/edit/change-pwd', updateUserPwd)
router.delete('/delete-user', deleteUser)



export default router;