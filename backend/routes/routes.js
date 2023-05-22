const express = require('express');
const router = express.Router();
const {register} = require('../constrollers/registerController');
const {login,adminLogin} = require('../constrollers/loginController');
const {saveToDatabase, updateNews, deleteNews} = require('../constrollers/saveToDatabaseController');
const {getNewsData, findData} = require('../constrollers/getNewsDataController');

router.post('/register',register);
router.post('/login',login);
// export default getData;
router.post('/saveToDatabase',saveToDatabase);
router.get('/getData/:searchValue/:activePage',getNewsData);
router.post('/editNews/:id',updateNews);
router.post('/deleteNews/:id',deleteNews);
router.get('/findNewsData/:id',findData);

router.post('/adminLogin',adminLogin)


module.exports = router;

