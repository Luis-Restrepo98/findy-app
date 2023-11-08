import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmailAndPassword } from '../../services/userService';
import { AppContext } from '../../routes/Router';
import { sweetAlert } from '../../utils/alerts';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { object, string } from 'yup';

import './login.scss';

const Login = () => {
  const navigate = useNavigate();

  const {
    userLogged: { userLogged, userLoggedDispatch },
  } = useContext(AppContext);

  const schema = object({
    email: string().email().required('required field'),
    password: string().min(4).required('required field'),
  });

  const findUser = async values => {
    const userFound = await getUserByEmailAndPassword(
      values.email.trim(),
      values.password.trim()
    );

    if (userFound) {
      const action = {
        type: 'LOGIN',
        payload: {
          isAuthenticated: true,
          user: userFound,
        },
      };
      userLoggedDispatch(action);
      // console.log('From Login:', userLogged);
      sweetAlert('success', `Welcome back ${userFound.name}`);
    } else {
      sweetAlert('error', 'Wrong credentials');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      findUser(values);
      actions.resetForm({});
    },
  });

  return (
    <main className='login__container'>
      <h1 className='login_title'>Welcome back!</h1>
      <form className='login_form' onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.errors.email} className='formControl'>
          <FormLabel>Your email</FormLabel>
          <Input
            type='email'
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={formik.errors.password} className='formControl'>
          <FormLabel>Your password</FormLabel>
          <Input
            type='password'
            className='input'
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <button type='submit'>Sign In</button>
        <br />
        <a
          className='create_account_link'
          onClick={() => navigate('/register')}
        >
          Don't have an account?
        </a>
      </form>
    </main>
  );
};

export default Login;
