import React, { useState, useContext } from 'react';

// semantic ui
import { Form, Button } from 'semantic-ui-react';

// gql - apollo
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

// custom hook
import { useForm } from '../util/hooks';

// context
import { AuthContext } from '../context/auth';

// HTML5 - by defaults validate emails... so putting - novalidate on the form
function Register(props) {
  // using/implement context
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const { handleChange, handleSubmit, values } = useForm(registerUserCallBack, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      // update(proxy, result) { // old implementation
      // console.log(result.data.register)
      setErrors({}); // clear errors
      // implement context
      context.login(userData);
      props.history.push('/');
    },
    // // this usual pattern
    // variables: {
    //   username: values.username,
    // },

    // shorthand method
    variables: values,
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  // work around solution to callbacks
  function registerUserCallBack() {
    addUser();
  }

  return (
    <div className='form-container'>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? 'loading' : ''}
      >
        <h1>Register</h1>
        <Form.Input
          label='Username'
          placeholder='Username..'
          name='username'
          type='text'
          value={values.username}
          error={errors.username ? true : false}
          required
          onChange={handleChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email..'
          name='email'
          type='email'
          value={values.email}
          error={errors.email ? true : false}
          required
          onChange={handleChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password..'
          name='password'
          type='password'
          value={values.password}
          error={errors.password ? true : false}
          required
          onChange={handleChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password..'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={errors.confirmPassword}
          required
          onChange={handleChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
