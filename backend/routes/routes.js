const express = require('express');
const router = express.Router();
const {register} = require('../constrollers/registerController');
const {login} = require('../constrollers/loginController');
const {saveToDatabase} = require('../constrollers/saveToDatabaseController');
const {getNewsData} = require('../constrollers/getNewsDataController');

router.post('/register',register);
router.post('/login',login);
// export default getData;
router.post('/saveToDatabase',saveToDatabase)
router.get('/getData',getNewsData)


module.exports = router;

