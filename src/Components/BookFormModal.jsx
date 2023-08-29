import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const PORT = import.meta.env.VITE_server_url;

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
  }


handleDelete = async (id) => {
  await axios.delete(`${PORT}/books/${id}`);
  this.setState({ books: this.state.books.filter(books => {
    console.log(books._id);
    return books._id !== id
  })});
}



  handleSubmit

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
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select>
                <option>True</option>
                <option>False</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
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
