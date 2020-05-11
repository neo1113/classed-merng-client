import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// installing semantic ui and css
// npm install react-router-dom semantic-ui-css semantic-ui-react
import { Container } from 'semantic-ui-react';

// css
import 'semantic-ui-css/semantic.min.css';
import './App.css';

// pages / components
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

// global context
import { AuthProvider } from './context/auth';

// handling routes with authentication
import AuthRoute from './util/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
