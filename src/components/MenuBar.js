import React, { useState, useContext } from 'react'; // imports useState hook
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

// context
import { AuthContext } from '../context/auth';

function MenuBar() {
  // using/implement context - destructuring
  const context = useContext(AuthContext);

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path); // start useState w/ empty string

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = context.user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item name={context.user.username} active as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={context.logout}
          as={Link}
          to='/login'
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
}

export default MenuBar;
