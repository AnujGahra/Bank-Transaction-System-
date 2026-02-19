const accountModel = require('../models/account.model');

/**
 * - create account controller
 * - POST /api/accounts/create
 */
async function createAccount(req, res) {

    const user = req.user;

    const account = await accountModel.create({
        user: user._id
    })

    res.status(201).json({
        account
    });


}


module.exports = {
    createAccount
};