const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema(
    {
        headLine: String,
        pic: String,
        subTitle: String,
        newsBrief: String
    }
)
const newsModel = mongoose.model('newsData',newsSchema);
module.exports = newsModel;