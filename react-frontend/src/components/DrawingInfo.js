import React, { Component } from 'react';

class DrawingInfo extends Component {
  state={
    editform: false,
    drawTypes: [],
    title: this.props.drawing.title,
    artist: this.props.drawing.artist, 
    description: this.props.drawing.description,
    categoryTypes: this.props.drawing.categories,
    categoryNames: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/api/v1/categories')
    .then(response => response.json())
    .then(data => {
      this.setState({
        categoryNames: data
      })
    })
  }

  editToggleHandler = () => {
    this.setState({
      editform: !this.state.editform
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.editOnSubmit(event, this.state, this.props.drawing)
    this.setState({
      editform: !this.state.editform, 
      [event.target.name]: event.target.value
    })

  }

  checkboxHandler = (event, categoryObj) => {
    console.log(event, categoryObj);

    let selectedArray;

    if(this.state.categoryTypes.map(function(categoryType) {return categoryType.id;}).indexOf(categoryObj.id) > -1){
      selectedArray = this.state.categoryTypes.filter(category => category.id !== categoryObj.id)
    } else {
      selectedArray = [...this.state.categoryTypes, categoryObj]
    }

    this.setState({
      [event.target.name]: selectedArray
    })
    
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    
  }

  render() {
    console.log(this.state.categoryTypes);
     
    const {drawing, onClick, deleteOnClick} = this.props    

    return (
      <div className="info-outer">
      <div className="info-card">

        <div id="buttons">

          {
            this.state.editform ? 
            <button name="save-button" 
              id="saves" 
              onClick={(event) => this.submitHandler(event)}></button> 
            : null
          }

          <button name="edit-button"
            id="edit"
            onClick={this.editToggleHandler}></button>

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

            <textarea rows="4" cols="43" name="description" value={this.state.description} onChange={(event) =>this.changeHandler(event)}/>

            <p>Categories</p> 
            {
              this.state.categoryNames.map(category => {
                
                return <p>
                  <input className="edit-checkbox"
                  type="checkbox"
                  name="categoryTypes"
                  onChange={(event)=> this.checkboxHandler(event,category)}
                  checked={this.state.categoryTypes.map(function(categoryType) {return categoryType.id;}).indexOf(category.id) > -1 }
                  value={category.name}
                  /> {category.name}
                </p>
                
              })
            }
            
          </form>
          :
          <div>
            <h3>{this.state.title}</h3>
            <i>by {this.state.artist}</i>
            <br/>

            <img src={drawing.image} alt=""/>

            <p>Description</p>
            <p>{this.state.description}</p>

            <p>Categories</p>
              <p>
                {
                  this.state.categoryTypes.map(categoryType => {
                    return `${categoryType.name} `
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