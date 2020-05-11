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
function Login(props) {
  // using/implementing the context
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const { handleChange, handleSubmit, values } = useForm(LoginUserCallBack, {
    email: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      // update(proxy, result) { // old implementation of getting the result back
      // console.log(result.data.login);
      setErrors({}); // clear errors
      // user has logged in
      console.log(userData);
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
  function LoginUserCallBack() {
    loginUser();
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
        <h1>Login</h1>
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
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
