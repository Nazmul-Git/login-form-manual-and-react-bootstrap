/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Register = () => {
    const [email, setEmail]=useState('');

    const emailOnChange=(event)=>{
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const passOnBlur=(event)=>{
        console.log(event.target.value);
    }

    const registerSubmit=(event)=>{
        event.preventDefault();
        const email=event.target.email.value;
        const pass=event.target.password.value;
        console.log(email, pass);
    }
    return (
        <div className=' text-center'>
            <h2>Register Here..</h2>
            <form onSubmit={registerSubmit} className='grid grid-cols-1 h-20 w-72 m-48 gap-6'>
                <input onChange={emailOnChange} type="email" name="email" id="email" placeholder='Your email ' />
                <input onBlur={passOnBlur} type="password" name="password" id="password" placeholder='Your password' />
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;