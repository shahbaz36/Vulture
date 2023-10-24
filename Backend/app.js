const express = require("express");
const morgan = require('morgan');

const userRouter = require("./routes/userRoutes");

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//necessary to make post request (MW)
app.use(express.json());

//Routes MW
app.use("/api/v1/users", userRouter);

//test api start

//test api ends


module.exports = app;
