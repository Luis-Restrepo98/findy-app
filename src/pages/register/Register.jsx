import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { sweetAlert } from '../../utils/alerts';

import './register.scss';
import { createUser } from '../../services/userService';

const Register = () => {
  const navigate = useNavigate();

  const backToLogin = () => navigate('/login');

  const schema = object({
    name: string().min(2).required('required field'),
    email: string().email().required('required field'),
    password: string()
      .min(4, 'At least 4 characters')
      .required('required field'),
  });

  const createNewUser = async values => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      profile: {
        bio: `soy ${values.name}`,
        avatar:
          'https://res.cloudinary.com/dbtqtuwzw/image/upload/v1694445359/Sprint3_MAKAIA/random.png',
      },
      followers: [0, 0],
      following: [0, 0],
    };

    const createdUser = await createUser(newUser);

    if (createdUser === 'already created') {
      sweetAlert('error', 'This email was already registered', '', 2000);
    } else if (createdUser) {
      sweetAlert(
        'success',
        'Register was successful',
        'You can now login to your account',
        2000
      );
      backToLogin();
    } else {
      sweetAlert('error', 'There was an error creating your account');
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values, actions) => {
      createNewUser(values);
      actions.resetForm({});
    },
  });

  return (
    <main className='register__container'>
      <h1 className='register_title'>Create an account</h1>
      <form className='register_form' onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.errors.name} className='formControl'>
          <FormLabel>Your name</FormLabel>
          <Input
            type='text'
            name='name'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>
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
            name='password'
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>
        <button type='submit'>Register</button>
        <a className='back_to_login_link' onClick={backToLogin}>
          Return to login
        </a>
      </form>
    </main>
  );
};

export default Register;
