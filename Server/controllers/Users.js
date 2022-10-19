import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import { nextDay } from "date-fns";


export const Register = async(req, res) => {
    const { username, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Passwords do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','username','email', 'roles']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}


export const updateUserPwd = async(req, res) => {
    const username = req.params.username
    const { oldPassword, newPassword, confPassword} = req.body
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    if( newPassword !== confPassword) return res.status(400).json({msg: "New Password and Confirm Password do not match"});
    try { 
        const user = await Users.findOne({
            where: {username}
        })
        
        
        //if( oldPassword !== user.password) return res.status(400).json({msg: "Enter a right password"});
        const match = await bcrypt.compare(oldPassword, user.password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        user.password = hashPassword
        await user.save();
        return res.json(user);

        
    } catch (err) {
        res.send(err)
    }
    
}

export const updateUser = async(req,res) =>{
    const username = req.params.username;
    const { name, email, role} = req.body;
    const check_username = await Users.findOne({
        where:{username: name}, raw: true
    })
    if(check_username !== null ) return res.status(409).json({msg: "username taken "})
   

    const check_email = await Users.findOne({
        where:{email: email}, raw: true
    })
    if(check_email !== null ) return res.status(409).json({msg: "Email is taken "})
   
    
    
    try{
        
    
        const user = await Users.findOne({
            where: {username}
        });
        
        user.username = name ? name: user.username ;
        user.email = email ? email: user.email;
        user.role_admin = role ? role: user.role_admin;
        
       
        await user.save();
        return res.json(user);
        
        

    }catch(err){
        
        return res.status(500).json({err: "An error occured"});
    }
}
 
export const deleteUser = async(req, res) => {
    const {id} =  req.body
try {
    
   const result = await Users.destroy({
        where: {
            id
        }
        
   });
        if(result === 0) {
            res.send({msg: 'User do not exist'})
        } else {
            res.send(`Deleted a user with ID: ${id}`)
        }

} catch (err) {
   res.send(err)
}      
}


export const Login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
}
 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);

}