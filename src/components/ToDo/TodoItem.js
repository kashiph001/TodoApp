import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, toggleComplete, moveTodo } from '../../features/todos/todosSlice';
import { Checkbox } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import './TodoItem.css';

const TodoItem = ({ todo, todos }) => {
  const dispatch = useDispatch();
  const index = todos.findIndex(t => t.id === todo.id);

  const isUpDisabled = index === 0;
  const isDownDisabled = index === todos.length - 1;

  return (
    <div className="todo_items">
      <Checkbox
        checked={todo.completed}
        onChange={() => dispatch(toggleComplete(todo.id))}
      />
      <div className='icon_text_container'>
        <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </p>
        <div className='icon_container'>
          <KeyboardArrowUpRoundedIcon
            style={{
              cursor: isUpDisabled ? 'default' : 'pointer',
              color: isUpDisabled ? 'gray' : 'inherit',
              pointerEvents: isUpDisabled ? 'none' : 'auto'
            }}
            onClick={() => !isUpDisabled && dispatch(moveTodo({ id: todo.id, direction: 'up' }))}
          />
          <ExpandMoreRoundedIcon
            style={{
              cursor: isDownDisabled ? 'default' : 'pointer',
              color: isDownDisabled ? 'gray' : 'inherit',
              pointerEvents: isDownDisabled ? 'none' : 'auto'
            }}
            onClick={() => !isDownDisabled && dispatch(moveTodo({ id: todo.id, direction: 'down' }))}
          />
          <DeleteForeverRoundedIcon
            onClick={() => dispatch(deleteTodo(todo.id))}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
