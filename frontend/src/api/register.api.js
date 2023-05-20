import Api from "./Api";

export const register = async ( email, name, lastName, password )=>
{
    
    try
    {
        let response = await Api().post('/register',{
                    email: email,
                    name: name,
                    lastName: lastName,
                    password: password
        });
        console.log('response Is ::::',response);

        return response;
    } 
    catch (error)
    {
        console.log('Error::::',error);
        return error;
    }
}