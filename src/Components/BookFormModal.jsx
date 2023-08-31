import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// const PORT = import.meta.env.VITE_SERVER_URL;

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate = async (book) => {
    console.log(book);
    let response = await axios.post(`${SERVER_URL}/books`, book);
    this.props.addNewBook(response.data);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, description, status } = e.target;
    this.handleCreate({
      title: title.value,
      description: description.value,
      status: status.value,
    });
  };

  render() {
    return (
      <>
        <Modal show={this.props.preview} onHide={this.props.toggleModal}>
          <Modal.Header
            style={{ fontSize: '150%', fontWeight: 'bold' }}
            closeButton
          >
            Add a New Book
          </Modal.Header>
          <Modal.Body style={{ width: '500px' }}>
            <Form
              onSubmit={this.handleSubmit}
              className="d-flex flex-column align-items-center"
            >
              <Form.Group
                style={{ marginBottom: '30px' }}
                className="text-center"
              >
                <Form.Label className="text-center">Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  style={{ marginTop: '5px', padding: '5px' }}
                />
              </Form.Group>
              <Form.Group
                style={{ marginBottom: '0px' }}
                className="text-center"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  style={{ marginTop: '5px', padding: '5px' }}
                />
              </Form.Group>
              <div className="d-flex flex-column mb-3">
                <Form.Label className="text-center">Available</Form.Label>
                <div className="d-flex flex-row mb-3">
                  <Form.Check
                    type="radio"
                    name="status"
                    value="true"
                    label="True"
                    style={{ marginRight: '10px' }}
                  />
                  <Form.Check
                    type="radio"
                    name="status"
                    value="false"
                    label="False"
                  />
                </div>
              </div>
              <Button
                onClick={() => this.props.toggleModal()}
                type="submit"
                variant="primary"
                style={{
                  padding: '8px 15px',
                  borderRadius: '4px',
                }}
              >
                Add
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.props.toggleModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default BookFormModal;
