const express = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { createAccount } = require('../controllers/account.controller');





const router = express.Router();


/**
 * - create account controller
 * - POST /api/accounts/create
 * - Protected Route, requires authentication
 */

router.post("/", authMiddleware, createAccount);



module.exports = router;