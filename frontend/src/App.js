import React, { createContext, useState } from 'react';
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
  const [disableButtons, setDisableButtons] = useState(false);
  const [inputValue, setInputValue] = useState({
    title: '',
    author: '',
    description: '',
  });
  const [list, setList] = useState([]);

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
          />
        </div>
      </ListContext.Provider>
    </InputContext.Provider>
  );
}

export default App;
