import React, { useEffect } from 'react'
import { googleLogin } from '../api/login.api';

function GoogleSignIn() {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    let google;

    useEffect(() => {
        CheckIfGoogleExist();
    },[]);

    const handleLoginCallbackResponse = async(response) =>
    {      
        console.log('response By Google',response.credential);
        
       let data = await googleLogin(response.credential);

       console.log('google login response by backend in Google Signing JSX ',data);
        
       console.log('Got JWT Token For Session By Backend ',data.data.token);
        localStorage.setItem('localSession',data.data.token);
        window.location.href ='/home';        
    }

    const CheckIfGoogleExist = () => {
        google = window.google;
        // console.log('google is' ,google);

        setTimeout(() => {
            try {
                if (window.google) {
                    google.accounts.id.initialize(
                        {
                            client_id: googleClientId,
                            callback: handleLoginCallbackResponse,
                        });

                    google.accounts.id.renderButton(
                        document.getElementById('signInDiv'),
                        { theme: 'filled_black', size: 'medium',text:'signin_with' }
                    );
                    clearTimeout();

                    if (!localStorage.getItem('log_session')) {
                        google.accounts.id.prompt();
                    }
                }
            } catch (error) {
                console.log("Not Ready Yet Error: ", error);
                CheckIfGoogleExist();
            }
        }, 500);
    }

    return (
        <div style={{marginTop:'2rem',marginLeft:'2rem'}} id="signInDiv">
        </div>
  
    )
}

export default GoogleSignIn