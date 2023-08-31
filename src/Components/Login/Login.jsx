/* eslint-disable no-unused-vars */
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import app from '../../Firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [successful, setSuccessful] = useState('');

    const loginUserSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const pass = event.target.password.value;
        console.log(email, pass)

        signInWithEmailAndPassword(auth, email, pass)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                if (loggedUser.emailVerified) {

                    setSuccessful('Login Successfully.');
                    setError('');
                }
                else {
                    alert('Please confirm your email validation.')
                    setSuccessful('');
                    setError('User not found..!!!')
                }



            })
            .catch(error => {
                setError(error.message);
            })
    }




    return (
        <div>
            <h2>Login Please</h2>
            <form onSubmit={loginUserSubmit} className='grid grid-cols-1 h-20 w-72 m-48 gap-6'>
                <input className='p-2' required type="email" name="email" id="email" placeholder='Your email ' />
                <input className='p-2' required type="password" name="password" id="password" placeholder='Your password' />
                <input className=' bg-blue-600 p-2 rounded-md text-2xl text-white' type="submit" value="Login" />
            </form>
            <p><small>New to this website? <Link to="/register">Register </Link>Here..</small></p>
            <p className='text-danger text-center'>{error}</p>
            <p className='text-success text-center'>{successful}</p>
        </div>
    );
};

export default Login;