import React from 'react';

const DrawingInfo = (props) => {
  console.log(props);
  const {drawing} = props;
  
  return (
    <div>
      <img src={drawing.image} alt=""/>
    </div>
  );
};

export default DrawingInfo;