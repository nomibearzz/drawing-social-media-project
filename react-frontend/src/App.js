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

  deleteHandler = (drawing) => {
    fetch(`http://localhost:3000/api/v1/drawings/${drawing.id}`,{
      method: 'DELETE'
    }).then(response => response.json())
    .then(data =>{
      this.setState({
        drawings: data,
        showInfo: !this.state.showInfo
      })
    })
  }

  submitHandler = (event, drawing) => {
    event.preventDefault();
    console.log(event);
    console.log(drawing);

    fetch('http://localhost:3000/api/v1/drawings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: drawing.title,
        image: drawing.canvas, 
        description: drawing.description,
        artist: drawing.artist,
        categories: drawing.categories
      })
    })
    .then(response=>response.json())
    .then(data=> {
        let drawings = [...this.state.drawings, data]
        this.setState({
          drawings
        })
    }).catch(error => console.log(error) )
  }

  render() {

    let drawings = this.state.drawings.map(drawing => 
      <DrawingContainer className="container" key={drawing.id} drawing={drawing} onClick={this.clickHandler} />
    )

    let drawPage = <DrawingPage onSubmit={this.submitHandler}/>

    return (
      <div className="App">
        <Nav />
  
        {this.state.showInfo ? 
        <DrawingInfo 
        drawing={this.state.clickedDrawing} 
        onClick={this.closeHandler}
        deleteOnClick={this.deleteHandler} /> 
        : null}

        <Switch>
          <Route exact path="/" render={() => drawings } />   
          <Route path="/drawingpage" render={()=> drawPage}/>
        </Switch>
        
      </div>
    );
  }
}

export default withRouter(App);
