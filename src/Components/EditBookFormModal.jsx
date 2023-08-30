import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class EditBookFormModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate = async (book) => {
    console.log(this.props.editBook);
    let id = this.props.editBook;
    let response = await axios.put(`${SERVER_URL}/books/${id}`, book);
    let updatedBook = response.data;
    this.props.editBook(updatedBook);
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
        <Modal
          show={this.props.editPreview}
          onHide={this.props.toggleEditModal}
        >
          <Modal.Header
            style={{ fontSize: '150%', fontWeight: 'bold' }}
            closeButton
          >
            Edit Book
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
                  placeholder={
                    this.props.editBook ? this.props.editBook.title : null
                  }
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
                  placeholder={
                    this.props.editBook ? this.props.editBook.description : null
                  }
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
                onClick={() => this.props.toggleEditModal()}
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
            <Button
              variant="primary"
              onClick={() => this.props.toggleEditModal()}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default EditBookFormModal;
