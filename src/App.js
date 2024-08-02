import React from 'react';
import Todo from './components/ToDo/Todo';
import './App.css'
import Header from './CommonComponents/Header/Header';


function App() {
  return (
    <div className="App">
      <Header/>
      <Todo/>
    </div>
  );
}

export default App;
