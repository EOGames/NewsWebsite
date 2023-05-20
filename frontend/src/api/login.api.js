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

