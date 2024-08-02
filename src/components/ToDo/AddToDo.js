import React from 'react';
import './AddToDo.css';

const AddTodo = ({ title, setTitle }) => {
  return (
    <form>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title..."
      />
    </form>
  );
};

export default AddTodo;
