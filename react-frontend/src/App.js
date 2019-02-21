import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import DrawingPage from './containers/DrawingPage.js';
import DrawingCard from "./components/DrawingCard";
import Nav from "./components/Nav.js";

class App extends Component {
  state={
    drawings: [],
    someData: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/drawings")
    .then(response=> response.json())
    .then(data=>{
      console.log(data)
      this.setState({
        drawings: data
      })
    })
  }

  submitHandler = (event, drawingData) => {
    event.preventDefault()  
    
    fetch('http://localhost:3000/api/v1/drawings', {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        title: drawingData.title,
        image: drawingData.canvas,
        description: drawingData.description,
        artist: drawingData.artist
      })
    }).then(response => response.json())
    .then(data => 
      this.setState({
        drawings: [...this.state.drawings, data]
      })  
    )
    
    
  }

  render() {
    
    let drawings = this.state.drawings.map(drawing => 
      <DrawingCard key={drawing.id} drawing={drawing}/>
    )
    let drawPage = <DrawingPage onSubmit={this.submitHandler}/>
    
    return (
      <div className="App">
        <Nav />
  
        <Switch>
          <Route exact path="/" render={()=> drawings } />   
          <Route path="/drawingpage" render={()=> drawPage}/>
        </Switch>
        
      </div>
    );
  }
}

export default App;
