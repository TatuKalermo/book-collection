import React, { useEffect, useState } from 'react';
import SimpleButton from '../components/Button';
import TextInput from '../components/TextInput';

const Form = ({ disableButtons }) => {
  const [inputValue, setInputValue] = useState({
    title: '',
    author: '',
    description: '',
  });
  const { title, author, description } = inputValue;

  // Submit functions

  const handleSaveNew = (event) => {
    event.preventDefault();
    console.log('Save new', inputValue);
    event.target.reset();
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log('Save', inputValue);
    event.target.reset();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log('Delete', inputValue);
    event.target.reset();
  };

  // Handlers for submit buttons to know which is which

  const handlers = {
    saveNew: handleSaveNew,
    save: handleSave,
    delete: handleDelete,
  };

  const submitHandler = (e) => {
    const { id } = e.nativeEvent.submitter; // <-- access submitter id
    handlers[id](e); // <-- proxy event to callback handler
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <TextInput
          label="Title"
          value={title}
          name="title"
          onChange={handleChange}
        />
        <TextInput
          label="Author"
          value={author}
          name="author"
          onChange={handleChange}
        />
        <TextInput
          label="Description"
          value={description}
          name="description"
          textArea
          onChange={handleChange}
        />
        <SimpleButton id="saveNew">Save New</SimpleButton>
        <SimpleButton id="save" disabled={disableButtons}>
          Save
        </SimpleButton>
        <SimpleButton id="delete" disabled={disableButtons}>
          Delete
        </SimpleButton>
      </form>
    </div>
  );
};

export default Form;
