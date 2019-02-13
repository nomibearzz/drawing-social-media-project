import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-bar">
      <Link to="/drawingpage">Doodle!</Link>
      <Link to="/">View All Drawings</Link>
    </div>
  );
};

export default Nav;