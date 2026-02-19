const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.routes');
const accountRouter = require('./routes/account.routes');



const app = express();

app.use(express.json());  // It is used to parse incoming JSON request bodies and make the data available in req.body.
app.use(cookieParser());  // It is used to parse cookies from the incoming HTTP requests and make them available in req.cookies.

/**
 * - Use Routes

 */
app.use("/api/auth", authRouter);
app.use("/api/accounts", accountRouter);


module.exports = app;