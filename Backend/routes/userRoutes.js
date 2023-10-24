const express = require("express");
const authController = require("../controller/authController");
const zapScanner = require("../utils/zap");

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login",authController.login);

router.get('/scan',zapScanner.runZAPScan);

module.exports = router;
