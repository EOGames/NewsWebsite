const news = require('../models/newsModel');

module.exports.saveToDatabase = async(req, res) => {
    
    const { headLine, pic, subTitle, newsBrief } = req.body;
    console.log('Data Received:::::::::',headLine,subTitle,newsBrief);
    try
    {
        const newNews = new news({
            headLine: headLine,
            pic: pic,
            subTitle: subTitle,
            newsBrief: newsBrief
        });
        let data = await newNews.save();
        
        return res.status(200).json(data);
    }
     catch (error) 
    {
        console.log(error);
        return res.status(500).json({message:'Unable To Save Data',error:error});
    }
}