import React, { useState } from 'react';
import './App.css';
import BookList from './containers/BookList';
import Form from './containers/Form';

function App() {
  const [disableButtons, setDisableButtons] = useState(false);
  return (
    <div className="App">
      <Form isDisabled={disableButtons} />
      <BookList disableButtons={setDisableButtons} />
    </div>
  );
}

export default App;
