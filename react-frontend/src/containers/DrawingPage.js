import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import { SketchPicker } from 'react-color';
import DrawingCard from "../components/DrawingCard.js";
import "../DrawingPage.css";

class DrawingPage extends Component {
  state={
    displayColor: false,
    color:'#000000',
    tools: Tools.Pencil,
    title: "",
    description: "",
    artist: "",
    canvas: "",
    categories: [],
    pickedCategories: []
      
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/categories')
    .then(response => response.json())
    .then(data => 
      this.setState({
        categories: data
      })
    )
  }

  colorChange = (color) =>{
    this.setState({
      color: color.hex
    })
  }

  clickHandler = (event) => {
    this.setState({
      tools: Tools[event.target.value]
    })
  }

  createHandler = (event) => {
    event.preventDefault()
    this.props.onSubmit(event, this.state);
    
    this.setState({
      title: "",
      description: "",
      artist: ""
    })

    this.canvas.clear()

  }

  changeHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value,
      canvas: this.canvas.toDataURL().toString()
    })
  }

  render() { 
    console.log(this.state.categories);

    return (
      <div className="drawing-page">
        <div className="drawing-tools">
          <input 
            className="icon-tools"
            type="image" 
            src = "https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png"
            value="Pencil"
            onClick={(event) =>this.clickHandler(event)} alt=""/>

          <input 
            className="icon-tools"
            type="image" 
            src="http://icons.iconarchive.com/icons/icons8/windows-8/256/Editing-Line-icon.png"
            value="Line"
            onClick={(event) =>this.clickHandler(event)} alt=""/>

          <input 
            className="icon-tools"
            type="image" 
            src = "https://cdn3.iconfinder.com/data/icons/materia-interface-vol-2/24/008_083_radio_button_unchecked_control-512.png"
            value="Circle"
            onClick={(event) =>this.clickHandler(event)} alt=""/>

          <input 
            className="icon-tools"
            type="image" 
            src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ic_check_box_outline_blank_48px.svg/600px-Ic_check_box_outline_blank_48px.svg.png"
            value="Rectangle"
            onClick={(event) =>this.clickHandler(event)} alt=""/>
        </div>

        <div className="sketch-field">
          <SketchField
            className="canvas"
            ref={canvas => (this.canvas = canvas)}
            width="700px"
            height="500px"
            tool={this.state.tools}
            fillColor={this.state.color}
            lineColor={this.state.color} />
        </div>

        <form className="create-info">
          <p>Title</p> 
          <input 
            type="text" 
            name="title" 
            value={this.state.title}
            onChange={(event)=> this.changeHandler(event)}
            placeholder="Name your masterpiece!"/><br/>
          <p>Description</p> 
          <textarea 
            name="description"
            value={this.state.description}
            onChange={(event)=>this.changeHandler(event)}
            placeholder="Put Something"/><br/>
          <p>Artist</p> 
          <input 
            type="text" 
            name="artist" 
            value={this.state.artist}
            onChange={(event)=>this.changeHandler(event)}
            placeholder="Your Name"/><br/>
          <p>Categories</p>
          {
            this.state.categories.map(category => 
              <p>
                <input className="category-boxes"
                type="checkbox"
                name="pickedCategories"
                onChange={"onChange function"}
                value={category.name}
                /> {category.name} 
              </p>
            ) 
          }


          <button onClick={(event)=>this.createHandler(event)}>Create!</button>
        </form>
      
          

        <div className="color-picker">
          <SketchPicker 
            disableAlpha={true}
            color={this.state.color}
            onChange={this.colorChange}/>
        </div>
        
      </div>
    );
  }
}

export default DrawingPage;