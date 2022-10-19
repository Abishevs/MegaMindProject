import express from 'express'
const userRouter = express.Router();
import {addRoles, addRolesToUser, findRoles } from '../controllers/UsersController.js'

userRouter.route('/add')
    .post(addRoles)

userRouter.route('/assignrole').post(addRolesToUser)
userRouter.route('/fetch').post(findRoles)



export default userRouter;