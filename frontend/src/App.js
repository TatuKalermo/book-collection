import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import BookList from './containers/BookList';
import Form from './containers/Form';

export const InputContext = createContext({
  title: '',
  author: '',
  description: '',
});

export const ListContext = createContext([]);

function App() {
  // States
  const [disableButtons, setDisableButtons] = useState(true);
  const [inputValue, setInputValue] = useState({
    title: '',
    author: '',
    description: '',
  });
  const [list, setList] = useState([]);
  const [errorState, setErrorState] = useState(null);

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
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeAllInputs = (title, author, desc) => {
    setInputValue((prev) => ({
      ...prev,
      title: title,
      author: author,
      description: desc,
    }));
  };
  const addToList = (item) => {
    console.log('addtoList: ', item);
    setList([...list, item]);
  };

  return (
    <InputContext.Provider value={inputValue}>
      <ListContext.Provider value={list}>
        <div className="App">
          <Form
            isDisabled={disableButtons}
            handleChange={handleChange}
            handleChangeAll={handleChangeAllInputs}
            addToList={addToList}
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
