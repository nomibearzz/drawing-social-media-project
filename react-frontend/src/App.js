import React, { Component } from 'react';
import { Route, Switch, withRouter,Link } from "react-router-dom";
import './App.css';
import DrawingPage from './containers/DrawingPage.js';
import DrawingContainer from "./containers/DrawingContainer";
import DrawingInfo from "./components/DrawingInfo";
import Searchbar from "./components/Searchbar";
import Nav from "./components/Nav.js";

class App extends Component {
  state={
    drawings: [],
    showInfo: false,
    clickedDrawing: [],
    types: [],
    drawArr: [],
    searchQuery: "",
    searchDrawing: [],
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/drawings")
    .then(response=> response.json())
    .then(data=>{
      this.setState({
        drawings: data,
        searchDrawing: data
      })
    })

    fetch('http://localhost:3000/api/v1/types')
    .then(response => response.json())
    .then(data =>{
      this.setState({
        types: data
      })
    })
  }

  changeHandler = (event) => {
    console.log(event.target.value);
      
    let filteredDrawing = [...this.state.drawings]

    filteredDrawing = filteredDrawing.filter(drawing => drawing.title.toLowerCase().includes(event.target.value.toLowerCase())
    )

    this.setState({
      searchDrawing: filteredDrawing,
      searchQuery: event.target.value

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
    console.log(drawing);
    
    fetch(`http://localhost:3000/api/v1/drawings/${drawing.id}`,{
      method: 'DELETE'
    }).then(response => response.json())
    .then(data => 
      this.setState({
        drawings: data, 
        showInfo: !this.state.showInfo
      })
    )

  }

  editSubmitHandler = (event, drawingInfo, drawing, type) => {
    event.preventDefault();
    console.log(drawingInfo.categoryTypes.map(function (item){return item.id}));
    console.log('clicked drawing', drawing);
    console.log('all the records in join', type);
    
    fetch(`http://localhost:3000/api/v1/drawings/${drawing.id}`, {
      method: 'PATCH', 
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        title: drawingInfo.title,
        description: drawingInfo.description,
        artist: drawingInfo.artist
      })
    }) .then(response => response.json())
    .then(data => {
      let newDrawings = [...this.state.drawings]

      newDrawings = newDrawings.map(drawing => {
        if(drawing.id === data.id){
          return data
        } else {
          return drawing
        }
      })

      this.setState({
        drawings: newDrawings
      })
      
    })

    type.map(item => {
      if(type.category_id === drawingInfo.categoryTypes.id){
        console.log(true);
        
      }else {
        console.log(false);
        
      }
    })
        
    
    

    
    
  }

  submitHandler = (event, drawing) => {
    event.preventDefault();

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
        categories: drawing.pickedCategories
      })
    })
    .then(response=>response.json())
    .then(data=> {
        console.log(data);
        console.log(drawing.pickedCategories);
        
        
        let newDrawings = [...this.state.drawings, data]
        this.setState({
          drawings: newDrawings
        })

        drawing.pickedCategories.map(category => {
          fetch('http://localhost:3000/api/v1/types', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              drawing_id: data.id,
              category_id: category.id
            })
          }).then(response => response.json())
          .then(data => {
            let newTypes = [...this.state.types, data]
            this.setState({
              types: newTypes
            })            
            
          })
        })

    }).catch(error => console.log(error) )
    
  }

 

  render() {
    
    let drawings = this.state.searchDrawing.map(drawing => 
      <DrawingContainer className="container" key={drawing.id} drawing={drawing} onClick={this.clickHandler} />
    )
    let drawPage = <DrawingPage onSubmit={this.submitHandler} />
    
    return (
      <div className="App">

        <div className = "nav-bar">
          <Searchbar 
            searchQuery={this.state.searchQuery}
            onChange={this.changeHandler}
          />

          <Link to="/drawingpage" style={{textDecoration:'none'}}>
            Doodle!
          </Link>

          <Link to = "/" style={{textDecoration:'none'}}>
            View All Drawings 
          </Link>
        </div>
        
  
        {this.state.showInfo ? 
        <DrawingInfo 
        drawing={this.state.clickedDrawing} 
        types={this.state.types}
        onClick={this.closeHandler}
        deleteOnClick={this.deleteHandler}
        editOnSubmit={this.editSubmitHandler} /> 
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
