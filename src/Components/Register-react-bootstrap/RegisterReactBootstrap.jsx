/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '../../Firebase/firebase.config';


const auth=getAuth(app);


const RegisterReactBootstrap = () => {
    const [error, setError]=useState('');
    const [successful,setSuccessful]=useState('');

    const registerSubmit = (event) => {

        event.preventDefault();
        
        // console.log(event.target.email.value);
        const email=event.target.email.value;
        const pass=event.target.password.value;
        // console.log('Email:',email,'Password:',pass);

        setError('');
        setSuccessful('');

        // validation
        if(!/(?=.{8,})/.test(pass)){
          setError('The password is at least 8 characters long. !!');
          return;
        }
        else if(!/(?=.*[A-Z])/.test(pass)){
            setError('The password has at least one uppercase letter.. !!');
            return;
        }
        else if(!/(?=.*[a-z])/.test(pass)){
            setError('The password has at least one lowercase letter. !!');
            return;
        }
        else if(!/(?=.*[0-9])/.test(pass)){
            setError('The password has at least one digit. !!');
            return;
        }
        else if(!/([^A-Za-z0-9])/.test(pass)){
            setError('The password has at least one special character. !!');
            return;
        }

        createUserWithEmailAndPassword(auth,email,pass)
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser);
            setError('');
            event.target.reset();
            setSuccessful('~Successful Submitted.~');
        })
        .catch(error=>{
            setError(error.message);
            setSuccessful('')
        })

    }

    return (
        <div className='mx-auto w-50 '>
            <h2 className='text-primary'>Please Register</h2>
            <Form onSubmit={registerSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        Well never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="You accept terms and conditions.?" />
                </Form.Group>
                <Button  variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p>{error}</p>
            <p>{successful}</p>
        </div>
    );
};

export default RegisterReactBootstrap;