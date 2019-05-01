import React from 'react';

const DrawingInfo = (props) => {
  const {drawing, onClick, deleteOnClick} = props
  console.log(drawing);
  
  return (
    <div className="info-outer">

      <div className="info-card">

        <div id="buttons">
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
            drawing.categories.map(category => `${category.name} `)
          }
        </p>
      
      </div>
    </div>
    
  );
};

export default DrawingInfo;