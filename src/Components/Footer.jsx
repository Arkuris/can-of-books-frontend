import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar
        style={{
          position: 'fixed',
          bottom: '0',
          width: '100%',
          textAlign: 'center',
          background: '#343a40',
          justifyContent: 'center'
        }}
        variant="dark"
      >
        <Navbar.Brand>Code Fellows</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
