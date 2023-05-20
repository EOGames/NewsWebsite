import React, { useRef, useState } from 'react'
import TickOrCross from '../components/TickOrCross';
import { register } from '../api/register.api';
import { NavLink, useNavigate } from "react-router-dom";


function Registration() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passValidation, setPassValidation] = useState([]);
    const [canFormSubmit, setCanFormSubmit] = useState(false);

    const navigate = useNavigate();

    const email = useRef('');
    const name = useRef('');
    const lastName = useRef('');


    const small_Regex = /[a-z]/;
    const capital_Regex = /[A-Z]/;
    const chqNumber = /\d/;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    const validInvalid = document.getElementById('validInvalid');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            validInvalid.innerHTML = 'LooksGood';
            validInvalid.style = 'color:green';

        } else {
            validInvalid.innerHTML = 'Both Password Must Match And Meet Requirements';
            validInvalid.style = 'color:red';
            return;
        }

        if (canFormSubmit) {
            //do stuff here

            let registrationData = await register(email.current.value, name.current.value, lastName.current.value, password);
            if (registrationData.status !== 200) {
                validInvalid.innerHTML = registrationData.response.data.message;
                validInvalid.style = 'color:red';
            }
            else
            {
                setTimeout(() => 
                {                
                  navigate('/');
                }, 1500);
                
                validInvalid.innerHTML = 'Registration Success ! Please Login To Continue';
                validInvalid.style = 'color:green';
            }

            console.log('registrationData:::::', registrationData);
        }
        else 
        {
            console.error('Not Allowed To Submit');
        }
    }

    const handlePassword = (e) => {
        let canSubmit = true;

        let checkList = [];
        //checking if text have atleast one small alphabet


        if (small_Regex.test(e)) {
            //if true
            checkList.push(<TickOrCross bool={true} msg='Must Contain Lowercase Alphabet' />);
        } else {
            canSubmit = false;
            checkList.push(<TickOrCross bool={false} msg='Must Contain Lowercase Alphabet' />);
        }

        if (capital_Regex.test(e)) {
            checkList.push(<TickOrCross bool={true} msg='Must Contain UpperCase Alphabet' />);
        } else {
            canSubmit = false;
            checkList.push(<TickOrCross bool={false} msg='Must Contain UpperCase Alphabet' />);
        }

        if (chqNumber.test(e)) {
            checkList.push(<TickOrCross bool={true} msg='Must Contain an Number' />);
        } else {
            canSubmit = false;
            checkList.push(<TickOrCross bool={false} msg='Must Contain an Number' />);
        }

        if (specialChars.test(e)) {
            checkList.push(<TickOrCross bool={true} msg='Must Contain Special Character ex:@#$%^&()*' />);
        } else {
            canSubmit = false;
            checkList.push(<TickOrCross bool={false} msg='Must Contain Special Character ex:@#$%^&()*' />);
        }

        if (e.length >= 8) {
            checkList.push(<TickOrCross bool={true} msg='Atleast 8 Characters Long' />);
        } else {
            canSubmit = false;
            checkList.push(<TickOrCross bool={false} msg='Atleast 8 Characters Long' />);
        }



        setPassValidation([...checkList]);

        if (canSubmit) {
            setPassword(e);
            setCanFormSubmit(true);
        }

    }
    return (
        <div>
            <div>
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                <div className='formHolder' onSubmit={handleSubmit}>
                    <form className='my_form' action="" method="post">
                        <input required type="email" placeholder='Email' ref={email} />
                        <input required type="text" placeholder='Name' ref={name} />
                        <input required type="text" placeholder='LastName' ref={lastName} />
                        <input onChange={(e) => handlePassword(e.target.value)} required type="text" placeholder='Password' />
                        <input onChange={(e) => setConfirmPassword(e.target.value)} required type="text" placeholder=' Confirm Password' />
                        <button className='submit_btn' type='submit'>Register</button>
                        <p id='validInvalid'></p>
                        <pre>
                            Already Registered..
                            <NavLink to={'/login'}>Login</NavLink>
                        </pre>
                    </form>

                    {
                        passValidation.length > 0 ?
                            <div className='passValidationScreen'>

                                {'Password: \n'}
                                {passValidation.map((msg, id) =>
                                    <span key={'msg_' + id}>{msg}</span>
                                )}
                            </div>
                            : null

                    }
                </div>
            </div>
        </div>
    )
}

export default Registration