import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_server_url;

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate = async (book) => {
    let response = await axios.post(`${SERVER_URL}/books`, book);
    this.props.addNewBook(response.data)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, description, status } = e.target;
    console.log(title + description + status)
    this.handleCreate({
      title: title.value,
      description: description.value,
      status: status.value,
    });
  }

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
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="title" />
              <input type="text" name="description" />
              <input type="checkbox" name="status" />
              <button type="submit">Create Pokemon!</button>
            </form>
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
