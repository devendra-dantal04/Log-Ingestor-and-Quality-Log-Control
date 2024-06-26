const router = require("express").Router();
const { loginUser } = require("../controllers/api1.controller.js");
const { getUserRepositories } = require("../controllers/api2.controller.js");
const { getCurrentBitcoinPrice } = require("../controllers/api3.controller.js");
const { fetchLogRecords } = require("../controllers/log.controller.js");
const determineLogFiles = require("../middleware/logs.middleware.js");

// API 1 Endpoints
router.route("/api1/login").post(loginUser);

// API 2 Endpoints
router.route("/api2/repos").get(getUserRepositories);

// API 3 Endpoints
router.route("/api3/price").get(getCurrentBitcoinPrice);

// Logs Routes
router.route("/logs").get(determineLogFiles, fetchLogRecords);

module.exports = router;
