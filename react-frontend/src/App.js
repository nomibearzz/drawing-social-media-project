import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import DrawingPage from './containers/DrawingPage.js';
import DrawingCard from "./components/DrawingCard";
import Nav from "./components/Nav.js";

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
    let drawings = this.state.drawings.map(drawing => 
      <DrawingCard key={drawing.id} drawing={drawing}/>
    )
    
    return (
      <div className="App">
        <Nav />
  
        <Switch>
          <Route exact path="/" render={() => drawings } />   
          <Route path="/drawingpage" component={DrawingPage}/>
        </Switch>
        
      </div>
    );
  }
}

export default App;
