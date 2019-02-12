import React, { Component } from 'react';
import './App.css';
import DrawingPage from './containers/DrawingPage.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DrawingPage />
      </div>
    );
  }
}

export default App;
