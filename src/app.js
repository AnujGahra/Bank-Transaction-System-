const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');



const app = express();

app.use(express.json());  // It is used to parse incoming JSON request bodies and make the data available in req.body.
app.use(cookieParser());  // It is used to parse cookies from the incoming HTTP requests and make them available in req.cookies.

app.use("/api/auth", authRouter);


module.exports = app;