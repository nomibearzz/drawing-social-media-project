import React, { Component } from 'react';
import './App.css';
import DrawingPage from './containers/DrawingPage.js';
import DrawingCard from "./components/DrawingCard";

class App extends Component {
  state={
    drawings: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/drawings")
    .then(response=> response.json())
    .then(data=>{
      this.setState({
        drawings: data
      })
    })
  }
  render() {
    console.log(this.state.drawings);
    
    return (
      <div className="App">
        <DrawingPage />
        <DrawingCard drawings={this.state.drawings}/>
      </div>
    );
  }
}

export default App;
