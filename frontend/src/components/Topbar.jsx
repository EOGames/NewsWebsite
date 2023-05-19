import React from 'react';
import { NavLink } from 'react-router-dom';

function Topbar() {
    return (
        <div className='topbar'>
            <ul>
                <li>
                    <NavLink to={'/'}> Home</NavLink>
                </li>

                <li>
                    <NavLink to={'/signUp'}> SignUp</NavLink>
                </li>

                <li>
                    <NavLink to={'/database'}> Database</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Topbar