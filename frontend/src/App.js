import React, { createContext, useState } from 'react';
import './App.css';
import BookList from './containers/BookList';
import Form from './containers/Form';

export const InputContext = createContext({
  title: '',
  author: '',
  description: '',
});

function App() {
  const [disableButtons, setDisableButtons] = useState(false);

  const [inputValue, setInputValue] = useState({
    title: '',
    author: '',
    description: '',
  });
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
  return (
    <InputContext.Provider value={inputValue}>
      <div className="App">
        <Form
          isDisabled={disableButtons}
          handleChange={handleChange}
          handleChangeAll={handleChangeAllInputs}
        />
        <BookList
          disableButtons={setDisableButtons}
          handleBookClick={handleChangeAllInputs}
        />
      </div>
    </InputContext.Provider>
  );
}

export default App;
