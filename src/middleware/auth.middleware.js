const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
// const emailService = require('../services/email.service');


async function authMiddleware(req, res, next) {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access, token is missing",
            status: "failed"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId).select('-password'); // Exclude password from the user object

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized access, user not found",
                status: "failed"
            });
        }

        req.user = user; // Attach the user object to the request for use in subsequent handlers
        return next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized access, invalid token",
            status: "failed"
        });
    }

}


module.exports = {
    authMiddleware
};