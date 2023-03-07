import React, { useContext, useState } from 'react';
import SimpleButton from '../components/Button';
import TextInput from '../components/TextInput';
import PropTypes from 'prop-types';
import { InputContext } from '../App.js';
import './Form.css';

const Form = ({ isDisabled, handleChange, handleChangeAll, addToList }) => {
  const { title, author, description } = useContext(InputContext);
  const [error, setError] = useState(null);

  // Submit functions

  const handleSaveNew = (event) => {
    event.preventDefault();
    console.log('Save new', title);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        author: author,
        description: description,
      }),
    };
    fetch('http://localhost:3001/books', requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        addToList({
          title: title,
          author: author,
          description: description,
        });
        handleChangeAll('', '', '');
      })
      .catch((error) => {
        setError(error.toString());
        console.error('There was an error!', error);
      });
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log('Save', author);
    event.target.reset();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    console.log('Delete', description);
    event.target.reset();
    handleChangeAll('', '', '');
  };

  // Handlers for submit buttons to link ids with handler functions

  const handlers = {
    saveNew: handleSaveNew,
    save: handleSave,
    delete: handleDelete,
  };

  const submitHandler = (e) => {
    const { id } = e.nativeEvent.submitter; // <-- Access submitter id
    handlers[id](e); // <-- Proxy event to callback handler
  };

  return (
    <div className="form-wrapper">
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
        <SimpleButton id="save" disabled={isDisabled}>
          Save
        </SimpleButton>
        <SimpleButton id="delete" disabled={isDisabled}>
          Delete
        </SimpleButton>
      </form>
    </div>
  );
};

Form.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleChangeAll: PropTypes.func.isRequired,
  addToList: PropTypes.func.isRequired,
};

export default Form;
