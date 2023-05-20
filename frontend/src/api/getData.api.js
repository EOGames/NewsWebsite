import Api from "./Api";

export const getData = async ()=>
{
    try {
        let response = await Api().get('/getData');

        return response;
        
    } catch (error) {
        return error;
    }
}