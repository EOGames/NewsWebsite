import Api from "./Api";

 export const updateNewsData = async(id,headLine, pic, subTitle, newsBrief)=>
{
    try {
        let response = await Api().post(`/editNews/${id}`,
        {
            headLine,
            pic,
            subTitle,
            newsBrief
        });

        return response;
    } 
    catch (error)
    {
        return error;    
    }
}