import { Users, Roles } from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res) => {
    const { username, fullname, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Passwords do not match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username: username,
            fullname: fullname,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Registration Successful" });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.findAll({
            where: {
                username: username
            }
        });

        //console.log(user)
        if (!username || !password) return res.status(400).json({ msg: 'All field are required' })
        if (!user || !user[0].active) {
            return res.status(401).json({ msg: 'Unauthorized' })
        }
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(401).json({ msg: "The password you’ve entered is incorrect" });
        const userId = user[0].id;
        const roles = await Users.findOne({ //JSON.parse(JSON.stringify(

            where: {
                id: userId

            },
            attributes: ['username'],
            include: [{
                model: Roles,
                attributes: ['role'],
                through: {
                    attributes: []
                }
            }],
            nest: true,
            raw: true,
            
        })



        const all_roles = roles.roles.role
        const name = user[0].username;
        const email = user[0].email;
        const fullname = user[0].fullname;
        console.log(all_roles)


        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "fullname": fullname,
                    "username": name,
                    "roles": all_roles
                }
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { "username": name }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        });
        res.cookie('jwt', refreshToken, {
            httpOnly: true, //accesible only by web
            secure: true, // https 
            sameSite: 'none', // cross-site cookie
            maxAge: 7 * 24 * 60 * 60 * 1000 // cokie expire set to match the refresh token
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({ msg: 'The password you’ve entered is incorrect!' });
    }
}


export const refreshv1 = async (req, res) => {
    try {
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });

    } catch (err) {

    }
}

export const refresh = async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ msg: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            try {
                if (err) return res.status(403).json({ msg: 'Forbidden' })

                const foundUser = await Users.findOne({where:{ username: decoded.username }})

                if (!foundUser) return res.status(401).json({ msg: 'Unauthorized' })
                const userId = foundUser.id;
                const roles = await Users.findOne({ 

                    where: {
                        id: userId

                    },
                    attributes: ['username'],
                    include: [{
                        model: Roles,
                        attributes: ['role'],
                        through: {
                            attributes: []
                        }
                    }],
                    nest: true,
                    raw: true
                })
                //console.log(foundUser)


                const all_roles = roles.roles.role
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "fullname": foundUser.fullname,
                            "username": foundUser.username,
                            "roles": all_roles
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15m' }
                )
                res.json({ accessToken })
            } catch (err) {
                res.status(503).json({ msg: 'Server do not respond' })
            }
        }
    )
}

export const logoutv2 = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);

}

export const logout = async (req, res) => {
    try {
        const cookies = req.cookies
        if (!cookies?.jwt) return res.sendStatus(204) //No content
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        res.json({ msg: 'Cookie cleared' })
    } catch (err) {
        res.send(err)
    }
}



