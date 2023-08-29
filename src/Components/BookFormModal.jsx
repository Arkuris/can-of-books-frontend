import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const PORT = import.meta.env.VITE_server_url;

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
  }


  handleCreate = async (book) => {
    console.log(book);
    let response = await axios.post(`${SERVER_URL}/books`, book);
    this.props.addNewBook(response.data)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, description, status } = e.target;
    this.handleCreate({
      title: title.value,
      description: description.value,
      status: status.value,
    });
  }

handleDelete = async (id) => {
  await axios.delete(`${PORT}/books/${id}`);
  this.setState({ books: this.state.books.filter(books => {
    console.log(books._id);
    return books._id !== id
  })});
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
              <input type="radio" name="status" value="true" />
              <input type="radio" name="status" value="false" />
              <button type="submit">Add</button>
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
