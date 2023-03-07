import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './BookList.css';
import { ListContext } from '../App';

const BookList = ({ disableButtons, handleBookClick, addToList }) => {
  const [errorState, setErrorState] = useState(null);
  const list = useContext(ListContext);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        console.log(data);
        data.map((item) => addToList(item));
      })
      .catch((error) => {
        setErrorState(error.toString());
        console.error('There was an error!', error);
      });
  }, []);

  const handleClick = (e) => {
    console.log(e.target);
    // handleBookClick()
    // disableButtons(false)
  };

  const bookList = list.map((book) => (
    <li key={book.id} onClick={() => handleClick}>
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
    </li>
  ));

  return (
    <div className="book-list">
      {!errorState ? <ul>{bookList}</ul> : <p>{errorState}</p>}
    </div>
  );
};

BookList.propTypes = {
  disableButtons: PropTypes.func.isRequired,
  handleBookClick: PropTypes.func.isRequired,
  addToList: PropTypes.func.isRequired,
};

export default BookList;
