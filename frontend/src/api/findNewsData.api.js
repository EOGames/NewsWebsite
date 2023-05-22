import Api from "./Api";

 export const findNewsData = async (id,activeJwt)=>
{
    try 
    {
        let response = await Api().get(`/findNewsData/${id}`
        // ,
        // {
        //     headers:{"Authorization":`Bearer ${activeJwt}`}
        // }
        );
        return response;    
    }
     catch (error)
    {
        return error;    
    }
    
}