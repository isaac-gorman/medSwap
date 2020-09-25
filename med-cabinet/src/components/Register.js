import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import * as yup from 'yup'
import schema from '../utils/schema'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {registerUser} from '../store/actions/treatmentFormActions';
import { connect } from 'react-redux';

const defaultValues ={
    email: '',
    password: '',
}

const defaultErrors = {
    email: '',
    password: '',    
}

const SignUp = ({registerUser}) => {
    const [values, setValues] = useState(defaultValues)
    const [errors, setErrors] = useState(defaultErrors)    
      
    const validate = (name, value) => {
        yup
        .reach(schema, name)
        .validate(value)
        .then((valid) => {
            setErrors({ ...errors, [name]: "" });
        })
        .catch((err) => {
            setErrors({ ...errors, [name]: err.message });
        });
    };
    
    const onChange = (evt) => {
        const { name, value } = evt.target;
        setValues({ ...values, [name]: value });
    };
      
    const onSubmit = (evt) => {
        evt.preventDefault();
        registerUser(values)
    };
    
    return (
       <form className='login-form'>
            <TextField 
            name='email'
            label='Email'
            variant='filled'
            onChange={onChange}
            value={values.email}
            color="secondary"
            /> <br/>

            <TextField
            name='password'
            variant='filled'
            type = 'Password'
            label= 'Password'
            required
            onChange={onChange}
            value={values.password}
            color="secondary"
            /> <br/>

            <Button 
            onClick={onSubmit}
            variant="contained" 
            color="secondary"
            >
                SIGN UP!
            </Button>

       </form>
    )
}

const mapStateToProps = state => {
    return {
        
    }
}

export default connect(mapStateToProps, {registerUser})(SignUp);

