import React, { Component } from 'react';
import DrawingCard from "../components/DrawingCard";

class DrawingContainer extends Component {
  render() {
    const {drawing, onClick}= this.props;
    return (
      <div>
        <DrawingCard key={drawing.id} drawing={drawing} onClick={onClick} />
      </div>
    );
  }
}

export default DrawingContainer;