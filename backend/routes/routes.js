const express = require('express');
const router = express.Router();
const {register} = require('../constrollers/registerController');

router.post('/register',register);


module.exports = router;

