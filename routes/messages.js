const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const messagesController = require("../controllers/messagesController");

router.get('/messages', catchErrors(messagesController.getAllMessages));
router.post('/messages', catchErrors(messagesController.createMessages));