import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

const BookList = ({ disableButtons }) => {
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
        console.log(data);
      })
      .catch((error) => {
        setErrorState(error.toString());
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className="book-list">
      <ul>
        <li>hei</li>
        <li>hei</li>
      </ul>
    </div>
  );
};

BookList.propTypes = {
  disableButtons: PropTypes.func.isRequired,
};

export default BookList;
