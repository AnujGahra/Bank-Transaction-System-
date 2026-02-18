const express = require('express');
const { userRegister } = require('../controllers/auth.controller');


const router = express.Router();

/* POST /api/auth/register */
router.post('/register', userRegister);






module.exports = router;