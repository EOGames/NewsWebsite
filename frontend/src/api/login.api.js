import Api from "./Api";


export const login = async (email, password) => {
    try {
        let response = await Api().post('/login', {
            email: email,
            password: password
        });

        return response;

    } catch (error) 
    {
        return(error);
    }
}

export const adminLogin = (email,password)=>
{
    try 
    {
        let response = Api().post('/adminLogin',
        {
            email:email,
            password: password
        }); 
        return response;
    } catch (error) {
        return error;
    }
}

