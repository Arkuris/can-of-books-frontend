import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import AuthButtons from './auth/AuthButton';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    return (
      <Navbar
        style={{
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem style={{ color: 'white', marginRight: '10px' }}>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </NavItem>
        {/* PLACEHOLDER: render a navigation link to the about page */}
        <NavItem style={{ color: 'white', marginRight: '10px' }}>
          <Link to="/About" className="nav-link">
            About
          </Link>
        </NavItem>
        <NavItem style={{ color: 'white', marginRight: '10px' }}>
          <Link to="/Profile" className="nav-link">
            Profile
          </Link>
        </NavItem>
        <AuthButtons />
      </Navbar>
    );
  }
}

export default withAuth0(Header);
