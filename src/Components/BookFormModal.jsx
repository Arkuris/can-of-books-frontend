import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class BookFormModal extends React.Component {
  constructor(props) {
    super(props);
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

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => this.props.handleCreate()}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default BookFormModal;
