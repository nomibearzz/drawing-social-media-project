import React, { Component } from 'react';

class DrawingInfo extends Component {
  state={
    editform: false,
    drawTypes: [],
    title: this.props.drawing.title,
    artist: this.props.drawing.artist, 
    description: this.props.drawing.description
  }

  editHandler = () => {
    console.log('clicky!');
    this.setState({
      editform: !this.state.editform
    })
  }

  submitHandler = (event) => {
    event.preventDefault();

  }

  changeHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
    
  }

  render() {
    const {drawing, onClick, deleteOnClick, types} = this.props  
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
      
        {
          this.state.editform ? 
          <form className="edit-form">
          
            <input type="text" name="title" value={this.state.title} onChange={(event) =>this.changeHandler(event)}/> 
            <br />
            <i>by <input type="text" name="artist" value={this.state.artist} onChange={(event) =>this.changeHandler(event)}/></i>
            <br/>

            <img src={drawing.image} alt=""/>
            <p>Description</p>

            <textarea name="description" value={this.state.description} onChange={(event) =>this.changeHandler(event)}/>

            <p>Categories</p> 
            

          </form>
          :
          <div>
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
          

        }

      </div>
    </div>
    );
  }
}

export default DrawingInfo;