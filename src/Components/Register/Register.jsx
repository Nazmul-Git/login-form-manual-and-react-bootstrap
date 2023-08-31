/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth= getAuth(app);

const Register = () => {
    const [error, setError]= useState('');
    const [successful, setSuccessful]=useState('');

    const emailOnChange=(event)=>{
        console.log(event.target.value);
        // setEmail(event.target.value);
    }

    const passOnBlur=(event)=>{
        console.log(event.target.value);
    }

    const registerSubmit=(event)=>{
        event.preventDefault();
        setSuccessful('');
        setError('');
        const email=event.target.email.value;
        const pass=event.target.password.value;
        // console.log(email, pass);

        //validation pass
        if(!/(?=.*[A-Z])/.test(pass)){
            setError('Please..at list one uppercase latter !');
            return;
        }
        else if(!/(?=.{8,})/.test(pass)){
            setError('Password should be 8 character or long !');
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(pass)){
            setError('Please add a special character.');
            return;
        }

        createUserWithEmailAndPassword(auth,email,pass)
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccessful('Created successfully !!');

        })
        .catch(error=>{
            console.error(error.message);
            setError(error.message);
            setSuccessful('');
        })
    }
    return (
        <div className=' '>
            <h2>Register Here..</h2>
            <form onSubmit={registerSubmit} className='grid grid-cols-1 h-20 w-72 m-48 gap-6'>
                <input onChange={emailOnChange} className='p-2' required   type="email" name="email" id="email" placeholder='Your email ' />
                <input onBlur={passOnBlur} className='p-2' required    type="password" name="password" id="password" placeholder='Your password' />
                <input className=' bg-blue-600 p-2 rounded-md text-2xl text-white' type="submit" value="Register" />
            </form>
            <p><small>Already have an account ? Please <Link to="/login">Login</Link></small></p>
            <p className=' text-danger'> {error}</p>
            <p className=' text-success'> {successful}</p>
        </div>
    );
};

export default Register;