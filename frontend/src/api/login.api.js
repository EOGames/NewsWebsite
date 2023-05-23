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

export const googleLogin = async (googleToken) =>
{
    let response;
    try 
    {
        response = await Api().post('/loginWithGoogle',
        {},
        {
            headers:{"Authorization":`Bearer ${googleToken}`}
        });

        // console.log('GoogleLogin Response By Api ',response);
        return response;
    } 
    catch (error)
    {
        console.log('google Login Api Encountered An Error ::::',error);
        return error;
    }
}

export const adminLogin = (email,password,activeJwt)=>
{
    try 
    {
        let response = Api().post('/adminLogin',
        {
            email:email,
            password: password
        },
        {
            headers:{"Authorization":`Bearer ${activeJwt}`}
        }); 
        return response;
    } catch (error) {
        return error;
    }
}

