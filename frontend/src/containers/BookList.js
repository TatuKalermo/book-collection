import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

const BookList = ({ disableButtons, handleBookClick }) => {
  const [list, setList] = useState([]);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setList(data);
      })
      .catch((error) => {
        setErrorState(error.toString());
        console.error('There was an error!', error);
      });
  }, []);

  const handleClick = (e) => {
    console.log(e.target);
    // handleBookClick()
  };

  return (
    <div className="book-list">
      {!errorState ? (
        <ul>
          {list.map((book) => {
            return (
              <li key={book.id} onClick={() => handleClick}>
                {book}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>{errorState}</p>
      )}
    </div>
  );
};

BookList.propTypes = {
  disableButtons: PropTypes.func.isRequired,
  handleBookClick: PropTypes.func.isRequired,
};

export default BookList;
