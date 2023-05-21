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

module.exports.updateNews = async (req,res)=>
{
    console.log('params>>>>>>>>', req.parms);
    const id = req.params.id;
    const swapData = req.body;
    
    try 
    {
        let data = await news.updateOne({_id:id},swapData);
       return res.status(200).json({message:'Update Success',data});
    } 
    catch (error)
    {
        return res.status(500).json({message:'Error While Updating',error:error});
    }
}

module.exports.deleteNews = async(req,res)=>
{
    const id = req.params.id;
    try 
    {
        let data = await news.deleteOne({_id:id});
        return res.status(200).json({message:'Successfully Deleted',data});
    } catch (error) {
        return res.status(500).json({message:'Got Error While Deleting',error:error});
    }
}