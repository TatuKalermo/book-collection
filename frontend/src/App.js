import React, { createContext, useState, useEffect } from 'react';
import './App.scss';
import BookList from './containers/BookList';
import Form from './containers/Form';

export const InputContext = createContext({
  id: undefined,
  title: '',
  author: '',
  description: '',
});

export const ListContext = createContext([]);

function App() {
  // States
  const [disableButtons, setDisableButtons] = useState(true);
  const [inputValues, setInputValues] = useState({
    id: undefined,
    title: '',
    author: '',
    description: '',
  });
  const [list, setList] = useState([]);
  const [errorState, setErrorState] = useState(null);
  const [textareaHeight, setTextareaHeight] = useState(3);

  // Use effects
  useEffect(() => {
    fetch('http://localhost:3001/books')
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        setList(
          data.map((item) => {
            return item;
          })
        );
      })
      .catch((error) => {
        setErrorState(error.toString());
        console.error('There was an error!', error);
      });
  }, []);

  // Handler functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'description') {
      const height = e.target.scrollHeight;
      const rowHeight = 15;
      const trows = Math.ceil(height / rowHeight) - 1;
      console.log('trows: ' + trows);
      if (trows !== textareaHeight) {
        setTextareaHeight(trows);
      }
    }
  };
  const handleChangeAllInputs = (id, title, author, desc) => {
    setInputValues((prev) => ({
      ...prev,
      id: id,
      title: title,
      author: author,
      description: desc,
    }));
  };
  const addToList = (item) => {
    setList([...list, item]);
  };
  const removeFromList = (id) => {
    setList(list.filter((book) => book.id !== id));
  };
  const updateInList = (id, title, author, desc) => {
    const nextList = list.map((book) => {
      if (book.id === id) {
        return {
          id: id,
          title: title,
          author: author,
          description: desc,
        };
      } else {
        return book;
      }
    });
    setList(nextList);
  };

  return (
    <InputContext.Provider value={inputValues}>
      <ListContext.Provider value={list}>
        <div className="App">
          <Form
            isDisabled={disableButtons}
            handleChange={handleChange}
            handleChangeAll={handleChangeAllInputs}
            addToList={addToList}
            removeFromList={removeFromList}
            updateInList={updateInList}
            textareaHeight={textareaHeight}
          />
          <BookList
            disableButtons={setDisableButtons}
            handleBookClick={handleChangeAllInputs}
            addToList={addToList}
            errorState={errorState}
          />
        </div>
      </ListContext.Provider>
    </InputContext.Provider>
  );
}

export default App;
