const ledgerModel = require('../models/ledger.model');
const accountModel = require('../models/account.model');
const transactionModel = require('../models/transaction.model');

/**
 * @desc Create a new transaction
 *  The 10-STEP TRANSFER FLOW:
 * 1. Validate request
 * 2. Validate idempotency key
 * 3. Check account status
 * 4. Derive sender balance from ledger
 * 5. Create transaction record with status "pending"
 * 6. Create DEEBIT ledger entry
 * 7. Create CREDIT ledger entry
 * 8. Mark transaction as "completed"
 * 9. Commit MONGO DB session
 * 10. Send email notification 
 */

async function createTransaction(req, res) {

    const {fromAccount, toAccount, amount, idempotencyKey} = req.body;

    if (!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({
            message: "Missing required fields",
            status: "failed"
        });
    }

    const fromUserAccount = await accountModel.findOne({_id: fromAccount});

    if(!fromUserAccount) {
        return res.status(404).json({
            message: "Sender account not found",
            status: "failed"
        });
    }

    const toUserAccount = await accountModel.findOne({_id: toAccount});

    if(!toUserAccount) {
        return res.status(404).json({
            message: "Recipient account not found",
            status: "failed"
        });
    }

    /**
     * 2. Validate idempotency key
     */

    const isTransactionExists = await transactionModel.findOne({idempotencyKey: idempotencyKey});

    if(isTransactionExists) {
        if(isTransactionExists.status === "completed") {
            return res.status(200).json({
                message: "Transaction already completed",
                status: "success",
                data: isTransactionExists
            });
        } else if(isTransactionExists.status === "pending") {
            return res.status(200).json({
                message: "Transaction is pending",
                status: "pending",
                data: isTransactionExists
            });
        } else {
            return res.status(400).json({
                message: "Invalid transaction status",
                status: "failed"
            });
        }

    }

    /**
     * 3. Check account status
     */

    if(fromUserAccount.status !== "active" || toUserAccount.status !== "active") {
        return res.status(400).json({
            message: "Sender account is not active",
            status: "failed"
        });
    }
}

