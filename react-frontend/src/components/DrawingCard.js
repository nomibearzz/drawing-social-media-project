import React from 'react';
import DrawingInfo from "./DrawingInfo";

const DrawingCard = (props) => {
  const {drawings} = props;

  return (
    <div className="drawings-container">
      {
        drawings.map(drawing => 
          <DrawingInfo key={drawing.id} drawing={drawing}/>
        )
      }

    </div>
  );
};

export default DrawingCard;