const express = require('express');
const router = express.Router();

const propertyController = require('../controllers/property_controller');

router.get("/", propertyController.fetchAll);
router.post("/toggle-like", propertyController.toggleLike);
router.post("/register", propertyController.register);
router.get("/fetch", propertyController.fetchProperty);
router.delete("/delete", propertyController.delete);

module.exports = router;


