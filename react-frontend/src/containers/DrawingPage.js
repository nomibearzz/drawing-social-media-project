import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import { SketchPicker } from 'react-color';
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
    categories: []
      
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
    fetch('http://localhost:3000/api/v1/drawings', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.title,
        image: this.state.canvas, 
        description: this.state.description,
        artist: this.state.artist,
        categories: this.state.categories
      })
    })

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
    console.log(this.state.canvas);
     
    return (
      <div>
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
          Title 
          <input 
            type="text" 
            name="title" 
            value={this.state.title}
            onChange={(event)=> this.changeHandler(event)}
            placeholder="Name your masterpiece!"/><br/>
          Description 
          <textarea 
            name="description"
            value={this.state.description}
            onChange={(event)=>this.changeHandler(event)}
            placeholder="Put Something"/><br/>
          Artist 
          <input 
            type="text" 
            name="artist" 
            value={this.state.artist}
            onChange={(event)=>this.changeHandler(event)}
            placeholder="Your Name"/><br/>
          <button onClick={(event)=>this.createHandler(event)}>Create!</button>
        </form>
        

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