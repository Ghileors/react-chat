const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const authController = require("../controllers/authController");

router.post("/login", catchErrors(authController.login));

router.post("/logout", catchErrors(authController.logout));

module.exports = router;