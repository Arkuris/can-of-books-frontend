import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/about.css'

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <div  className="centered-container">
        <Card style={{ width: '18rem' }} >
          <Card.Img
            variant="top"
            src="https://avatars.githubusercontent.com/u/104961833?v=4"
          />
          <Card.Body>
            <Card.Title>Chester Lee Coloma</Card.Title>
            <Card.Text>Full-stack Software Developer</Card.Text>
            <Button
              variant="primary"
              href="https://github.com/cleecoloma"
              target="_blank"
            >
              GitHub
            </Button>
          </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src="https://avatars.githubusercontent.com/u/134695595?v=4"
          />
          <Card.Body>
            <Card.Title>David Danilchik</Card.Title>
            <Card.Text>Full-stack Software Developer</Card.Text>
            <Button
              variant="primary"
              href="https://github.com/Arkuris"
              target="_blank"
            >
              GitHub
            </Button>
          </Card.Body>
        </Card>
      </div>
    );}
}

export default Profile;
