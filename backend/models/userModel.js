const mongoose = require('mongoose');
const uri = process.env.databaseLink || 'mongodb://localhost:27017/itsDatabase';

mongoose.connect(uri);

const userDetailScheme = new mongoose.Schema(
    {
        email:String,
        name:String,
        lastName:String,
        password:String
    }
);

const user = mongoose.model('userDetails',userDetailScheme);
module.exports = user;  