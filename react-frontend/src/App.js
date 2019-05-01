import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';
import DrawingPage from './containers/DrawingPage.js';
import DrawingContainer from "./containers/DrawingContainer";
import DrawingInfo from "./components/DrawingInfo";
import Nav from "./components/Nav.js";

class App extends Component {
  state={
    drawings: [],
    showInfo: false,
    clickedDrawing: [],
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

  clickHandler = (drawing) => {
    this.setState({
      showInfo: !this.state.showInfo,
      clickedDrawing: drawing.drawing
    })
  }

  closeHandler = () => {
    this.setState({
      showInfo: !this.state.showInfo,
      clickedDrawing: []
    })
  }

  render() {
    
    let drawings = this.state.drawings.map(drawing => 
      <DrawingContainer className="container" key={drawing.id} drawing={drawing} onClick={this.clickHandler} />
    )

    return (
      <div className="App">
        <Nav />
  
        {this.state.showInfo ? <DrawingInfo drawing={this.state.clickedDrawing} onClick={this.closeHandler} /> : null}

        <Switch>
          <Route exact path="/" render={() => drawings } />   
          <Route path="/drawingpage" component={DrawingPage}/>
        </Switch>
        
      </div>
    );
  }
}

export default withRouter(App);
