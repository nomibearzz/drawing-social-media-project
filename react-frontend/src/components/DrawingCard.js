import React from 'react';
import DrawingInfo from "./DrawingInfo";

const DrawingCard = (props) => {
  const {drawing} =props
  return (
    <div className="drawings-container">
      <img src={drawing.image} alt=""/>
      <h4>{drawing.title}</h4>
      <i>by {drawing.artist}</i>

    </div>
  );
};

export default DrawingCard;