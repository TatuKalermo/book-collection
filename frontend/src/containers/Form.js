import React, { useContext } from 'react';
import SimpleButton from '../components/Button';
import TextInput from '../components/TextInput';
import PropTypes from 'prop-types';
import { InputContext } from '../App';
import './Form.css';

const Form = ({ isDisabled, handleChange, handleChangeAllInputs }) => {
  const { title, author, description } = useContext(InputContext);

  // Submit functions

  const handleSaveNew = (event) => {
    event.preventDefault();
    console.log('Save new', title);
    event.target.reset();
    handleChangeAllInputs('', '', '');
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
    handleChangeAllInputs('', '', '');
  };

  // Handlers for submit buttons to link ids with handler functions

  const handlers = {
    saveNew: handleSaveNew,
    save: handleSave,
    delete: handleDelete,
  };

  const submitHandler = (e) => {
    const { id } = e.nativeEvent.submitter; // <-- access submitter id
    handlers[id](e); // <-- proxy event to callback handler
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
  handleChangeAllInputs: PropTypes.func.isRequired,
};

export default Form;
