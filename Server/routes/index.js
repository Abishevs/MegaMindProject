import express from "express";
import { getUsers, updateUserPwd, deleteUser, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import path from "path";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));



const router = express.Router();
 
router.get('/users' /*,verifyToken,*/, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.patch('/change-password', updateUserPwd)
router.delete('/delete-user', deleteUser)




//error routes, always at the end of the file!
router.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.all('*', (req, res) =>{
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ Message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})


export default router;