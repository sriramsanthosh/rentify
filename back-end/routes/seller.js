const express = require('express');
const router = express.Router();

const sellerController = require('../controllers/seller_controller');

router.get("/fetch-all", sellerController.fetchAll);


module.exports = router;