const express = require("express");
const router = express.Router();
0;
const authMiddleware = require("../middleware/auth");
const { login, dashboard } = require("../controllers/main");

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
