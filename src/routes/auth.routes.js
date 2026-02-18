const express = require('express');
const { userRegister, userLogin } = require('../controllers/auth.controller');


const router = express.Router();

/* POST /api/auth/register */
router.post('/register', userRegister);

// POST /api/auth/login
router.post('/login', userLogin);






module.exports = router;