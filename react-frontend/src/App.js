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
        
        {
          this.state.drawings.map(drawing => 
            <DrawingCard key={drawing.id} drawing={drawing}/>
          )
        }
      </div>
    );
  }
}

export default App;
