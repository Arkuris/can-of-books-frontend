import { Component } from 'react';
import Card from 'react-bootstrap/Card';
import '../style/about.css';

class Profile extends Component {
  render() {
    return (
      <div className="centered-container">
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.user.picture} />
          <Card.Body>
            <Card.Title>{this.props.user.nickname}</Card.Title>
            <Card.Text>{this.props.user.email}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Profile;
