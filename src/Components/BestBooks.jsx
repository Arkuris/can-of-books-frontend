import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import { Button } from 'react-bootstrap';

const PORT = import.meta.env.VITE_SERVER_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      preview: false,
    };
  }

  fetchAllBooks = () => {
    console.log('reaching to server');
    axios.get(`${PORT}/books`).then((response) => {
      this.setState({ books: response.data });
      console.log(response.data);
    });
  };

  toggleModal = () => {
    this.setState({ preview: !this.state.preview });
  };

  addNewBook = (book) => {
    this.setState({ books: [...this.state.books, book] });
  };

  // this is a lifecycle method, any code put here will occur automatically when the component "mounts" the DOM.
  componentDidMount() {
    this.fetchAllBooks();
  }

  handleDelete = async (id) => {
    await axios.delete(`${PORT}/books/${id}`);
    this.setState({
      books: this.state.books.filter((books) => {
        console.log(books._id);
        return books._id !== id;
      }),
    });
  };

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {
    /* TODO: render all the books in a Carousel */

    return (
      <div>
        <div
          style={{
            margin: '0 20rem',
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
          addNewBook={this.addNewBook}
          toggleModal={this.toggleModal}
          preview={this.state.preview}
        />
        {this.state.books.length ? (
          <Carousel style={{margin: '1rem 20%'}}>
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
                    variant="warning"
                    onClick={() => this.handleDelete(books._id)}
                  >
                    Delete Book!
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

export default BestBooks;
