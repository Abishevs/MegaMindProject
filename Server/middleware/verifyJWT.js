import jwt from "jsonwebtoken";
 
export const verifyToken1 = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}

export const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    const token = authHeader.split(' ')[1]

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Unauthorized'})
    }

   

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({ msg: 'Forbidden'})
            //req.username = decoded.username
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();

        }
    )
}