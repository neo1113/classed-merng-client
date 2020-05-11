import React, { createContext, useReducer } from 'react';

// jwtToken decoder
// npm install jwt-decode
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

// check to know when to persist the token/authentication
if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  // check expiration by using a decoder - jwtDecode
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState); // state initialization

  function login(userData) {
    // persist the token using localStorage
    localStorage.setItem('jwtToken', userData.token);
    dispatch({ type: 'LOGIN', payload: userData });
  }

  function logout() {
    // remove token from localStorage
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }} // reference to state variables
      {...props}
    />
  );
}

export { AuthContext, AuthProvider }; // reference to global state/variables
