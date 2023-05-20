import React from 'react';
import { NavLink } from 'react-router-dom';
import { logOut } from '../store/Slices/logoutSlice';
import{useDispatch} from 'react-redux';


function Topbar() {

    // const navigate = useNavigate();
    const auth = localStorage.getItem('localSession');
    const dispatch = useDispatch();
    


    const handleLogout = () =>
    {
        dispatch(logOut());
    }
    return (
        <div className='topbar'>
            <ul>
                {
                    auth ?
                        <>
                            <li>
                                <NavLink to={'/'}> Home</NavLink>
                            </li>

                            <li>
                                <NavLink to={'/database'}> Database</NavLink>
                            </li>


                            <li>
                                <NavLink onClick={handleLogout}> LogOut</NavLink>
                            </li>

                        </>
                        :
                        <>
                            <li>
                                <NavLink to={'/signUp'}> SignUp</NavLink>
                            </li>

                            <li>
                                <NavLink to={'/login'} > Login</NavLink>
                            </li>
                        </>
                }



            </ul>
        </div>
    )
}

export default Topbar