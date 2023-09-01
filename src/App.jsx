import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import BestBooks from './Components/BestBooks';
import Profile from './Profile';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { withAuth0 } from '@auth0/auth0-react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  handleProfilePage = (person) => {
    this.setState({
      user: person,
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={
                isAuthenticated ? (
                  <BestBooks handleProfilePage={this.handleProfilePage} />
                ) : (
                  <p> Please Log In! </p>
                )
              }
            ></Route>
            <Route
              exact
              path="/Profile"
              element={isAuthenticated ? <Profile user={this.state.user} /> : <p> Please Log In! </p>}
            ></Route>
            <Route exact path="/About" element={<About />}></Route>
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
