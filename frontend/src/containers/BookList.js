import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './BookList.scss';
import { ListContext } from '../App';

const BookList = ({ disableButtons, handleBookClick, errorState }) => {
  const list = useContext(ListContext);
  const [activeId, setActiveId] = useState(undefined);

  // Change input values to clicked book's values
  const handleClick = (e) => {
    const clickedBook = list.find((item) => {
      return item.id === Number(e.target.id);
    });
    handleBookClick(
      clickedBook.id,
      clickedBook.title,
      clickedBook.author,
      clickedBook.description
    );
    disableButtons(false);
    setActiveId(clickedBook.id);
  };

  const bookList = list.map((book) => (
    <div
      key={book.id}
      className="booklist-item"
      id={book.id}
      onClick={handleClick}
      style={{
        backgroundColor: book.id === activeId ? 'lightgreen' : '#c8c7c5',
      }}
    >
      <li key={book.id} id={book.id} onClick={handleClick}>
        <h3 key={book.id} id={book.id} onClick={handleClick}>
          {book.title}
        </h3>
        {book.author}
      </li>
    </div>
  ));

  return (
    <div className="book-list">
      <div className="book-box">
        {!errorState ? <ul>{bookList}</ul> : <p>{errorState}</p>}
      </div>
    </div>
  );
};

BookList.propTypes = {
  disableButtons: PropTypes.func.isRequired,
  handleBookClick: PropTypes.func.isRequired,
  errorState: PropTypes.string,
};

export default BookList;
