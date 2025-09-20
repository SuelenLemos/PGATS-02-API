
const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const authMiddleware = require('../service/authMiddleware');

router.post('/', authMiddleware, transferService.transfer);

module.exports = router;
