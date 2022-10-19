import {Users, Roles } from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const register = async(req, res) => {
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

export const login = async(req, res) => {

        
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
        
        const roles = await user.getUser(user);
        const accessToken = jwt.sign({userId, name, email, roles }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, name, email, roles}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        /*
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        }); */
        res.cookie('jwt', refreshToken,{
            httpOnly: true, //accesible only by web
            secure: true, // https 
            sameSite: 'none', // cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 // cokie expire set to match the refresh token
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email not found"});
    }
} 

export const refresh = async (req, res) => {
    try {
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

    } catch (err) {

    }
}

export const logout = async(req, res) => {
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

export const loginv2 = async(req, res) => {
    /*
        
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
        if (!user || !user.active) return res.status(401).json({ messgae: 'Unnauhthorized'})
        
        //const roles = await user.getUser(user);
        
        const accesToken = jwt.sign(
            {
                "UserInfo": {
                    "username": user.username,
                    "roles": user.active //roles

                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s'}
        )

        const refreshToken = jwt.sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: 'id'}
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accesible only by web
            secure: true, // https 
            sameSite: 'none', // cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 // cokie expire set to match the refresh token
        })

        res.json({ accesToken })

    
    } catch (error) {
        res.status(400).json({msg: "idk"}) */
}


