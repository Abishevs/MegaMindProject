import express from 'express'
const userRouter = express.Router();
import {addRoles, addRolesToUser, findRoles } from '../controllers/UsersController.js'
import {verifyJWT } from '../middleware/verifyJWT.js'
import { getUsers } from '../controllers/UsersController.js'

//userRouter.use(verifyJWT)

userRouter.route('/add')
    .post(addRoles)
userRouter.get('/' , getUsers)
userRouter.route('/assignrole').post(addRolesToUser)
userRouter.route('/fetch').post(findRoles)



export default userRouter;