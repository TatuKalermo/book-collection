import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './BookList.css';
import { ListContext } from '../App';

const BookList = ({ disableButtons, handleBookClick, errorState }) => {
  const list = useContext(ListContext);

  // Change input values to clicked book's values
  const handleClick = (e) => {
    const clickedBook = list.find((item) => {
      return item.id === Number(e.target.id);
    });
    handleBookClick(
      clickedBook.title,
      clickedBook.author,
      clickedBook.description
    );
    disableButtons(false);
  };

  const bookList = list.map((book) => (
    <li key={book.id} id={book.id} onClick={handleClick}>
      Title: {book.title}
      Author: {book.author}
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
};

export default BookList;
