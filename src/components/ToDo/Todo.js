import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, getTodos } from '../../features/todos/todosSlice';
import AddTodo from './AddToDo';
import TodoList from './TodoList';
import './Todo.css';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Checkbox } from '@mui/material';

function Todo() {
  const dispatch = useDispatch();
  const todosStatus = useSelector(state => state.todos.status);
  const todos = useSelector(state => state.todos.todos);
  const [title, setTitle] = useState('');
  const completedCount = useSelector((state) => state.todos.completedCount);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addNewTodo(title));
      setTitle('');
    }
  };

  useEffect(() => {
    if (todosStatus === 'idle' && todos.length === 0) {
      dispatch(getTodos());
    }
  }, [todosStatus, dispatch, todos.length]);

  return (
    <div className="todo_container">
      <div className='todo_innercontainer'>
        <h2>Design System</h2>
        <div className='list_container'>
          <TodoList />
          <div className='icon_list_container'>
            <div className='check_input_container'>
              <Checkbox disabled />
              <AddTodo setTitle={setTitle} title={title} />
            </div>
          </div>
        </div>
        <div className='todo_btn_container'>
          <div className='todo_result_container'>
            <RemoveRedEyeOutlinedIcon />
            Completed
            <span>{completedCount} of {todos.length}</span>
          </div>
          <button type="submit" onClick={handleSubmit}>
            <span>+</span>Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
