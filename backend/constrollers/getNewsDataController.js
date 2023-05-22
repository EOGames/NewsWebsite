const news = require('../models/newsModel');

module.exports.getNewsData = async(req,res)=>
{
    const searchValue = req.params.searchValue;
    let activePage = parseInt(req.params.activePage);
    console.log(`serchValue: ${searchValue} activePage:${activePage} (before Modification)`);
    ++activePage;
    
    //creating offset to limit data fetch

    const fetchLimit = 10;    
    let offset = (activePage-1) *fetchLimit;

    console.log(`after Modification of page activePage ${activePage} fetchLimit ${fetchLimit} offset ${offset}`);

    let count;
    try 
    {
        
        if (searchValue !== 'null' && searchValue !== undefined && searchValue !== '')
        {
            // console.log('here and Search is ', searchValue);
            let data = await news.find(
                {
                    $or:
                    [
                        {headLine:{$regex :searchValue, $options:'i'}},
                        {subTitle:{$regex:searchValue,$options:'i'}},
                        {newsBrief:{$regex:searchValue,$options:'i'}},
                    ]
                }
            ).skip(offset).limit(fetchLimit);
            
            count = data.length;
            
            data.count = count;
            res.status(200).json({data,count:count});        

        }
        else
        {
            let data = await news.find().skip(offset).limit(fetchLimit);
            count = await news.count({});
            data.count = count;
            res.status(200).json({data,count:count});        
        }
    }
     catch (error) 
    {
        console.log('Error In method getNewsData Error::::',error);
        return res.status(500).json({message:'Got Error While Fetching Data ',error:error});
    }
}

module.exports.findData = async(req,res)=>
{
    const id = req.params.id;
    try 
    {
        let data = await news.findById({_id:id});
        return res.status(200).json({message:'found Data',data});

    }
     catch (error)
    {
        return res.status(404).json({message:'Got Error While Finding Data',error:error});
    }
}