import Api from "./Api";

export const getData = async (searchValue,activePage=0,activeJwt)=>
{
    let response;
    try {
        if (searchValue !== undefined && searchValue.length >0 && searchValue.trim().length > 0)
        {
             response = await Api().get(`/getData/${searchValue}/${0}`,
             {
                 headers:{"Authorization":`Bearer ${activeJwt}`}
             });
        }
        else
        {
            response = await Api().get(`/getData/null/${activePage}`,
            {
                headers:{"Authorization":`Bearer ${activeJwt}`}
            });
        }

        return response;
        
    } catch (error) {
        return error;
    }
}