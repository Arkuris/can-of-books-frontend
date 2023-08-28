import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

const PORT = import.meta.env.VITE_server_url;


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  fetchAllBooks = () => {
    console.log('reaching to server')
    axios.get(PORT)
      .then(response => {
        this.setState({ books: response.data });
        console.log(response.data)
      });
  }

  // this is a lifecycle method, any code put here will occur automatically when the component "mounts" the DOM.
  componentDidMount() {
    this.fetchAllBooks();
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
              <Carousel>
                    {this.state.books.map(<Carousel.Item> 
                      <Carousel.Caption>
                        <h3>
                          {this.state.title}
                        </h3>
                        <p>
                          {this.state.descriptions}
                        </p>
                        <p>
                          Availible? {this.state.status}
                        </p>
                      </Carousel.Caption>
                    </Carousel.Item>)
                    }
              </Carousel>
        ) : (
          <h3>No Books Found :</h3>
        )}

      </>
    )
  }
}

export default BestBooks;
