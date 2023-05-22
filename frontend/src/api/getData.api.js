import Api from "./Api";

export const getData = async (searchValue,activePage=0)=>
{
    let response;
    try {
        if (searchValue !== undefined && searchValue.length >0 && searchValue.trim().length > 0)
        {
             response = await Api().get(`/getData/${searchValue}/${activePage}`);
        }
        else
        {
            response = await Api().get(`/getData/null/${activePage}`);
        }

        return response;
        
    } catch (error) {
        return error;
    }
}