import Api from "./Api";

 export const findNewsData = async (id)=>
{
    try 
    {
        let response = await Api().get(`/findNewsData/${id}`);
        return response;    
    }
     catch (error)
    {
        return error;    
    }
    
}