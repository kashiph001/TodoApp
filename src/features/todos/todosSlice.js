import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createTodo, fetchTodos } from './todosAPI';

const todosFromLocalStorage = JSON.parse(localStorage.getItem('todos')) || [];
const initialCompletedCount = todosFromLocalStorage.filter(todo => todo.completed).length;

const initialState = {
  todos: todosFromLocalStorage,
  status: 'idle',
  error: null,
  completedCount: initialCompletedCount,
};

export const getTodos = createAsyncThunk('todos/fetchTodos', async (_, { getState }) => {
  const { todos } = getState();
  if (todos.todos.length === 0) {
    const response = await fetchTodos();
    return response.data.slice(0, 20);
  } else {
    return todos.todos;
  }
});

export const addNewTodo = createAsyncThunk('todos/createTodo', async (title) => {
  const newTodo = { title, completed: false };
  const response = await createTodo(newTodo);
  return response.data;
});

const generateUniqueId = (todos) => {
  const maxId = todos.reduce((max, todo) => Math.max(todo.id, max), -1);
  return maxId + 1;
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleComplete: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        state.completedCount += todo.completed ? 1 : -1;
      }
      localStorage.setItem('todos', JSON.stringify(state.todos));
      localStorage.setItem('completedCount', JSON.stringify(state.completedCount));
    },
    deleteTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo && todo.completed) {
        state.completedCount -= 1;
      }
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
      localStorage.setItem('completedCount', JSON.stringify(state.completedCount));
    },
    moveTodo: (state, action) => {
      const { id, direction } = action.payload;
      const index = state.todos.findIndex(todo => todo.id === id);
      if (index === -1) return;

      if (direction === 'up' && index > 0) {
        const newIndex = index - 1;
        const [movedTodo] = state.todos.splice(index, 1);
        state.todos.splice(newIndex, 0, movedTodo);
      } else if (direction === 'down' && index < state.todos.length - 1) {
        const newIndex = index + 1;
        const [movedTodo] = state.todos.splice(index, 1);
        state.todos.splice(newIndex, 0, movedTodo);
      }

      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
        state.completedCount = action.payload.filter(todo => todo.completed).length;
        localStorage.setItem('todos', JSON.stringify(state.todos));
        localStorage.setItem('completedCount', JSON.stringify(state.completedCount));
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        const newTodo = { ...action.payload, id: generateUniqueId(state.todos) };
        state.todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      });
  },
});

export const { toggleComplete, deleteTodo, moveTodo } = todosSlice.actions;

export default todosSlice.reducer;
