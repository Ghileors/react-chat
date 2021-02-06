const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/login", catchErrors(authController.login));

router.post("/logout", catchErrors(authController.logout));

router.get('/', catchErrors(userController.getUsers));

router.put('/mute', catchErrors(userController.muteUser));

router.put('/ban', catchErrors(userController.banUser));

module.exports = router;