const {Router} = require('express');
const {authMiddleware} = require('../middleware/auth.middleware');


const transactionRoutes = Router();

/**
 * @route POST /api/transactions
 * @desc Create a new transaction
 * 
 */

transactionRoutes.post('/', authMiddleware);


module.exports = transactionRoutes;