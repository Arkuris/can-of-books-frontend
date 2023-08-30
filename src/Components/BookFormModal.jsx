import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const PORT = import.meta.env.VITE_SERVER_URL;

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

  handleDelete = async (id) => {
    await axios.delete(`${PORT}/books/${id}`);
    this.setState({
      books: this.state.books.filter((books) => {
        console.log(books._id);
        return books._id !== id;
      }),
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
            <form
              onSubmit={this.handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <label style={{ marginBottom: '10px' }}>
                Title:
                <input
                  type="text"
                  name="title"
                  style={{ marginTop: '5px', padding: '5px' }}
                />
              </label>
              <label style={{ marginBottom: '10px' }}>
                Description:
                <input
                  type="text"
                  name="description"
                  style={{ marginTop: '5px', padding: '5px' }}
                />
              </label>
              <div style={{ display: 'flex', marginBottom: '10px' }}>
                <label style={{ marginRight: '10px' }}>
                  <input type="radio" name="status" value="true" /> True
                </label>
                <label>
                  <input type="radio" name="status" value="false" /> False
                </label>
              </div>
              <button
                type="submit"
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Add
              </button>
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
