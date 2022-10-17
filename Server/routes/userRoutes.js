import express from 'express'
const router = express.Router()
import {getAllUsers, createNewUser, updateUser, deleteUser} from '../controllers/usersControllers'

router.route('/')
    .get(getAllUsers)
    .post(createNewUser)
    .patch(updateUser)
    .delete(deleteUser)
    
export default router;