import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminLogin, login } from "../api/login.api";

const AdminLogin = ({setAdminLogged}) => {
    // const navigation = useNavigate();

    const email = useRef('');
    const password = useRef('');
    const [loader, setLoader] = useState(false);

    const handleLogin = async () => {
        if (email.current.value.trim().length <= 0 || password.current.value.trim().length <= 0) {
            console.log('email password cant be empty');
            return;
        }
        setLoader(true);
        // console.log('email: ', email.current.value, 'password: ', password.current.value);
        let data = await adminLogin(email.current.value, password.current.value);
        console.log('Login Response:::::', data);

        const handleLoginError = document.getElementById('handleLoginError');
        if (data.status !== 200) 
        {
            handleLoginError.innerHTML = data.response.data.message;
            handleLoginError.style = 'color:red';
            setLoader(false);
        } else
        {
            setLoader(false);
            handleLoginError.innerHTML = '';
            localStorage.setItem('access','aproved');
            setAdminLogged(true);
            // window.location.href ='/database';
        }
    }
    return (
        <div>
                <h1 style={{textAlign:'center',color:'darkred'}}> Restricted Area Login To Continue</h1>
            <div className="formHolder">
                <div className="my_form">
                    <form action="">

                        <input required ref={email} type="text" placeholder="Enter Email" />
                        <input required ref={password} type="text" placeholder="Enter password" />
                        {
                            loader ?
                                <button disabled onClick={handleLogin} className="submit_btn">Loading...</button>
                                :
                                <button type="submit" onClick={handleLogin} className="submit_btn">Login</button>
                        }
                    </form>
                    <pre>
                        Not Registered..
                        <NavLink to={'/signUp'}>SignUp</NavLink>
                    </pre>
                    <p id="handleLoginError"></p>
                </div>
            </div>
        </div>

    );
}
export default AdminLogin;