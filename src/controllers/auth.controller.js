const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


/**
 * 
 * - user register controller
 * - POST /api/auth/register
 */
async function userRegister(req, res) {
    const { name, email, password } = req.body;

    const isExistingUser = await userModel.findOne({ email });

    if (isExistingUser) {
        return res.status(422).json({
            message: "User already exists with this email",
            status: "failed"
        });

    }

    const user = await userModel.create({
        name,
        email,
        password
    })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });

    res.cookie('token', token)
    res.status(201).json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        },
        token,
        message: "User registered successfully",
        status: "success"
    })
}



module.exports = {
    userRegister
}