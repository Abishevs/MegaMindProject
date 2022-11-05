import {Users, Roles} from "../models/userModel.js";
import bcrypt from "bcrypt";




export const getUsers = async(req, res) => {
    try {
       
        const users = await Users.findAll({ 

            attributes: ['id','username','email', 'active', 'fullname'],
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
        console.log(users)
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const addRoles = async(req, res) => {
    const {role} = req.body;
    try {
        await Roles.create(
             {
                role: role
            });
            res.json({msg: "Addded secuflly"});
    } catch (err) {
        res.send(err)
    }
}

export const findRoles = async(req, res) => {
    const {id} = req.body

    try {
        
        const user = await Users.findOne({
             where: {
                id: id
              
            }, 
            attributes: ['username', 'email', 'active'],
            include: [{
                model:  Roles,
                attributes: ['roles'],
                through: {
                    attributes: []
                }
            }]
            //attributes: ['username'],
            //raw: true
            
          });
        
        const roles = user.roles
        
    
        //Roles.getUser(user);
        res.json(roles)
        //res.send(roles)
    } catch (error) {
        console.log(error)
    }
}

export const addRolesToUser = async(req, res) => {
    const {id, role_id} = req.body
    try {
        const user = await Users.findOne({ where: { id: id } });
        const roles = await Roles.findOne({ where: { id: role_id } });
        // add project and user to the join table with the custom method:
        roles.addUser(user);
        res.json({msg: "Added Successful"});
    } catch (err) {
        res.send(err)
    }
}
export const updateUserPwd = async(req, res) => {
    const id = req.params.id
    const { oldPassword, newPassword, confPassword} = req.body
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    if( newPassword !== confPassword) return res.status(400).json({msg: "New Password and Confirm Password do not match"});
    try { 
        const user = await Users.findOne({
            where: {id: id}
        })
        
        
        
        const match = await bcrypt.compare(oldPassword, user.password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        user.password = hashPassword
        await user.save();
        return res.status(200).json({msg: "Updated sucessfully"});

        
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
