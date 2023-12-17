import React from 'react';
import logo from './logo.svg';
import './App.css';
import LayoutApp from './components/LayoutApp';
import Exaple from './components/exaple';

function App() {
  return (
    <div className="App">
      <LayoutApp title="Home" />
      <h1>Hello Word</h1>
      <Exaple />
    </div>
  );
}

export default App;
