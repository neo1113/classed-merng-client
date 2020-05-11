// installing apollo client
// npm install @apollo/react-hooks apollo-cache-inmemory apollo-link-http apollo-client
import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
// to connect or properly run the apollo-devtools install the following belo
// npm install react-apollo apollo-client-devtools

// npm install apollo-link-context
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/', // NOTE: different setup in production
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
}); // setContext((req, prev)) // orig implement

const client = new ApolloClient({
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const Apollo = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

export default Apollo;
