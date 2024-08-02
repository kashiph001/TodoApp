import axios from 'axios';

export const fetchTodos = () => axios.get('https://jsonplaceholder.typicode.com/todos');
export const createTodo = (todo) => axios.post('https://jsonplaceholder.typicode.com/todos', todo);