const express = require('express');
const router = express.Router();
const { sendUserMessage, sendCaptainMessage } = require('../controllers/support.controller');
const { authUser, authCaptain } = require('../middleware/auth.middleware');

router.post('/chat', authUser, sendUserMessage);
router.post('/captain-chat', authCaptain, sendCaptainMessage);

module.exports = router;