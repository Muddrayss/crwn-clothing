import { useState } from 'react';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormField = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth({
        ...user,
        displayName: displayName,
      });

      resetFormField();
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Can not create an account, email already in use.');
          break;
        default:
          console.log('User creation encountererd an error: ', error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          type='text'
          name='displayName'
          value={displayName}
          required
          onChange={handleChange}
        />

        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          required
          onChange={handleChange}
        />

        <FormInput
          label='Password'
          type='password'
          name='password'
          value={password}
          required
          onChange={handleChange}
        />

        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          required
          onChange={handleChange}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
