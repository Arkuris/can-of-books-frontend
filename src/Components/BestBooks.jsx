import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import EditBookFormModal from './EditBookFormModal';
import { Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

const PORT = import.meta.env.VITE_SERVER_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      preview: false,
      editPreview: false,
      editBook: null,
      editMessage: false,
      token: null,
    };
  }

  fetchAllBooks = () => {
    console.log('reaching to server');
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
      method: 'GET',
      baseURL: 'http://localhost:3001',
      url: '/books',
    };
    axios(config).then((response) => {
      this.setState({ books: response.data });
      console.log(response.data);
    });
  };

  toggleModal = () => {
    this.setState({ preview: !this.state.preview });
  };

  toggleEditModal = () => {
    this.setState({ editPreview: !this.state.editPreview });
  };

  addNewBook = (book) => {
    this.setState({ books: [...this.state.books, book] });
  };

  handleEditBook = (updatedBook) => {
    let replacementIndex = null;
    this.state.books.forEach((book, idx) => {
      if (book._id === updatedBook._id) {
        replacementIndex = idx;
      }
    });
    this.setState({
      books: this.state.books.map((book, idx) => {
        if (idx === replacementIndex) {
          return updatedBook;
        } else {
          return book;
        }
      }),
    });
    this.toggleEditModal;
  };

  // this is a lifecycle method, any code put here will occur automatically when the component "mounts" the DOM.
  async componentDidMount() {
    let res = await this.props.auth0.getIdTokenClaims();
    const token = res.__raw;
    console.log('OUR WEB TOKEN', token);
    this.setState({ token }, () => this.fetchAllBooks());
  }

  handleDelete = async (id) => {
    console.log('reaching to server');
    const config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
      method: 'DELETE',
      baseURL: 'http://localhost:3001/',
      url: `/books/${id}`,
    };
    axios(config); 
    this.setState({
      books: this.state.books.filter((books) => {
        console.log(books._id);
        return books._id !== id;
      }),
    });
  };

  handleEditModal = (book) => {
    console.log(book);
    console.log(this.state.editBook);
    this.setState({
      editPreview: !this.state.editPreview,
      editBook: book,
    });
  };

  render() {
    return (
      <div>
        <div
          style={{
            margin: '2rem 20rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
          <Button variant="primary" onClick={this.toggleModal}>
            Add a Book
          </Button>
        </div>
        <BookFormModal
          token={this.state.token}
          addNewBook={this.addNewBook}
          toggleModal={this.toggleModal}
          preview={this.state.preview}
        />
        {this.state.books.length ? (
          <Carousel style={{ margin: '1rem 20%' }}>
            {this.state.books.map((books, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src="https://media.discordapp.net/attachments/1136025197523259402/1145868153285525514/arkuris42069_a_bookshelf_drawn_in_a_realistic_depiction_bcf85a72-12e1-4da1-bc7c-0aa73e44f912.png?width=889&height=889"
                  alt="First slide"
                />
                <Carousel.Caption style={{ backgroundColor: 'black' }}>
                  <h3>{books.title}</h3>
                  <p>{books.description}</p>
                  <p>Available? {JSON.parse(books.status) ? 'Yes' : 'No'}</p>
                  <Button
                    variant="secondary"
                    onClick={() => this.handleEditModal(books)}
                  >
                    Update
                  </Button>
                  <EditBookFormModal
                    handleUpdate={this.handleUpdate}
                    toggleEditModal={this.handleEditModal}
                    editPreview={this.state.editPreview}
                    handleEditBook={this.handleEditBook}
                    editBook={this.state.editBook}
                    token={this.state.token}
                  />
                  <Button
                    className="mx-2"
                    variant="danger"
                    onClick={() => this.handleDelete(books._id)}
                  >
                    Delete
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <h3>No Books Found :</h3>
        )}
      </div>
    );
  }
}

const AuthBestBooks = withAuth0(BestBooks);

export default AuthBestBooks;
