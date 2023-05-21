import Api from "./Api";

export const deleteNews = async (id)=>
{
    try 
    {
        const response = await Api().post(`/deleteNews/${id}`);
        return response;        
    }
     catch (error) 
    {
        return error;    
    }
}