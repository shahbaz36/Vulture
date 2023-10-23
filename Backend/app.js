const express = require("express");
const morgan = require('morgan');

const userRouter = require("./routes/userRoutes");
const zapScanner = require("./utils/zap");

const app = express();

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//necessary to make post request
app.use(express.json());

//Routes MW
app.use("/api/v1/users", userRouter);
//Routes
app.route("/").get(zapScanner.runZAPScan);

module.exports = app;
