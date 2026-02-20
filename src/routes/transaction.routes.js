const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth.middleware');
const { createTransaction } = require('../controllers/transaction.controller');


const transactionRoutes = Router();

/**
 * @route POST /api/transactions
 * @desc Create a new transaction
 * 
 */

transactionRoutes.post('/', authMiddleware, createTransaction);


module.exports = transactionRoutes;