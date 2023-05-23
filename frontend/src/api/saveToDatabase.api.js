import Api from "./Api";

export const saveToDatabase = async (headLine, pic, subTitle, newsBrief) => {
    try 
    {
        let response = await Api().post('/saveToDatabase',
            {
                headLine: headLine,
                pic: pic,
                subTitle: subTitle,
                newsBrief: newsBrief
            });

            return response;
    }
     catch (error) 
    {
        return(error);
    }
}