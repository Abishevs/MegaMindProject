import express from 'express'
const userRouter = express.Router();
import {addRoles, addRolesToUser, findRoles, updateUserPwd } from '../controllers/UsersController.js'
import {verifyJWT } from '../middleware/verifyJWT.js'
import { getUsers } from '../controllers/UsersController.js'

//userRouter.use(verifyJWT)

userRouter.route('/add')
    .post(addRoles)
userRouter.get('/' , getUsers)
userRouter.route('/assignrole').post(addRolesToUser)
userRouter.route('/fetch').post(findRoles)
userRouter.route('/:id/changepwd').patch(updateUserPwd)



export default userRouter;