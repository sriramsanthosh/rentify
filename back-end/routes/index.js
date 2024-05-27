const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get("/", homeController.home);
router.use("/property", require("./property"));
router.use("/seller", require("./seller"));
router.post("/login", homeController.login);
router.post("/register", homeController.register);
router.post("/send-email", homeController.sendMail);


module.exports = router;