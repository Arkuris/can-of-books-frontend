import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const PORT = import.meta.env.VITE_SERVER_URL;

class EditBookFormModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCreate = (book) => {
    const config = {
      headers: {
        Authorization: `Bearer ${this.props.token}`,
      },
      method: 'PUT',
      baseURL: `${PORT}`,
      url: `/books/${this.props.editBook._id}`,
      data: book,
    };
    console.log(book);
    axios(config).then((response) => {
      this.props.handleEditBook(response.data)
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, description, status } = e.target;
    if (title && description && status) {
      this.handleCreate({
        title: title.value,
        description: description.value,
        status: status.value,
      });
      this.props.toggleEditModal();
    }
  };

  render() {
    // console.log(this.props.editBook);
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
                  id={this.props.editBook ? this.props.editBook.title : null}
                  type="text"
                  name="title"
                  placeholder={
                    this.props.editBook ? this.props.editBook.title : null
                  }
                  style={{ marginTop: '5px', padding: '5px' }}
                  required
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
                  required
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
                    required
                  />
                  <Form.Check
                    type="radio"
                    name="status"
                    value="false"
                    label="False"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                style={{
                  padding: '8px 15px',
                  borderRadius: '4px',
                }}
              >
                Edit
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
