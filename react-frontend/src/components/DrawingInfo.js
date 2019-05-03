import React, { Component } from 'react';

class DrawingInfo extends Component {
  state={
    editform: false,
    drawTypes: []
  }

  editHandler = () => {
    console.log('clicky!');
    this.setState({
      editform: !this.state.editform
    })
    
  }

  render() {
    const {drawing, onClick, deleteOnClick, editOnSubmit, types} = this.props
    console.log('log', types);
    console.log('log', drawing);
    
    console.log(this.state.editform);

    
    return (
      <div className="info-outer">

      <div className="info-card">

        <div id="buttons">

          <button name="edit-button"
            id="edit"
            onClick={this.editHandler}></button>

          <button name="delete-button"
            id="trash"
            onClick={()=>deleteOnClick(drawing)}></button>

          <button name="exit-button" 
            id="close" 
            onClick={()=>onClick()} ></button>
        </div>
      
        <h3>{drawing.title}</h3>
        <i>by {drawing.artist}</i>
        <br/>
  
        <img src={drawing.image} alt=""/>
        <p>Description</p>
        <p>{drawing.description}</p>
        <p>Categories</p>
        <p>
          {
            types.map(type => {
              if (type.drawing_id === drawing.id){
                return `${type.category.name} `
              }
            })
          }
        </p>
      
      </div>
    </div>
    );
  }
}

export default DrawingInfo;