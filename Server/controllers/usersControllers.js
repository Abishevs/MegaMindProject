import userModel from '../models/userModel'
import asyncHandler from 'express-async-handler'
import bycrypt from 'bcrypt'
import Users from '../models/userModel'

// @desc Get all users
// @route get /users
// @access Private

export const getAllUsers = asyncHandler(async (req, res,) => {
    const users = await userModel.findAll().select('-password').lean()
    if (!users) {
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
})

// @desc creat new user
// @route POST /users
// @access Private
export const createNewUser = asyncHandler(async (req, res,) => {
    const {username, email, password, roles } = req.body

    //confirm data
    if (!username ||!email || !password || Array.isArray(roles) || !roles.lenght) {
        return res.status(400).json({ message: 'All field are required'})
    } 

    //check for duplicate
    const duplicate = await Users.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Username already exists'})
    }
    //hash password
    const hashedPwd = await bycrypt.hash(password, 10) //salt rounds

    userObject = { username, "password": hashedPwd, roles}
    
    // create and store new user
    const user = await Users.create(userObject)
    if (user) {
        res.status(201).json({ message: `New user ${email} created`})
    }else {
        res.status(400).json({ message: 'Invalid user data recieved'})
    }
})


// @desc update a user
// @route PATCH /users
// @access Private
export const updateUser = asyncHandler(async (req, res,) => {
    const { id, email, roles, active, password } = req.body
    //confirm datata
    if (!id || !username || !email || !Array.isArray(roles) || !roles.lenght || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required'})
    }

    const user = await userModel.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found'})
    }
    //check for duplicate
    const duplicate = await userModel.findOne({ email }).lean().exec()
    //allow updates to orignal user
    if (duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({ message: 'Duplicate email'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        //hash password
        user.password = await bycrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ message:`${updatedUser.username} updated `})
})

// @desc delete a user
// @route DELETE /users
// @access Private
export const deleteUser = asyncHandler(async (req, res,) => {
    
})


