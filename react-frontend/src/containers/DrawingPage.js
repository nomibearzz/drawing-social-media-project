import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';
import { SketchPicker } from 'react-color';
import "../DrawingPage.css";

class DrawingPage extends Component {
  state={
    displayColor: false,
    color:'#ff8a65',
    tools: Tools.Pencil
  }

  colorChange = (color) =>{
    this.setState({
      color: color.hex,
    })
  }

  lineClick = (event) => {
    console.log(event.target.value);
    console.log('click');
    this.setState({
      tools: Tools[event.target.value]
    })
    
  }

  render() {   
    console.log(SketchField);
    console.log(this.props);
    
     
    return (
      <div>
        <div className="sketch-field">
          <SketchField
          className="field"
          width="700px"
          height="500px"
          tool={this.state.tools}
          fillColor={this.state.color}
          lineColor={this.state.color}
           />
        </div>

        <div className="drawing-tools">
          <input 
            className="icon-tools"
            type="image" 
            src = "https://cdn4.iconfinder.com/data/icons/software-menu-icons/256/SoftwareIcons-68-512.png"
            value="Pencil"
            onClick={(event) =>this.lineClick(event)} alt=""/>

          <input 
            className="icon-tools"
            type="image" 
            src="http://icons.iconarchive.com/icons/icons8/windows-8/256/Editing-Line-icon.png"
            value="Line"
            onClick={(event) =>this.lineClick(event)} alt=""/>

          <input 
            className="icon-tools"
            type="image" 
            src = "https://cdn3.iconfinder.com/data/icons/materia-interface-vol-2/24/008_083_radio_button_unchecked_control-512.png"
            value="Circle"
            onClick={(event) =>this.lineClick(event)} alt=""/>

          <input 
            className="icon-tools"
            type="image" 
            src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Ic_check_box_outline_blank_48px.svg/600px-Ic_check_box_outline_blank_48px.svg.png"
            value="Rectangle"
            onClick={(event) =>this.lineClick(event)} alt=""/>

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