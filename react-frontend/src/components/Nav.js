import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-bar">

        <Link to="/drawingpage" style={{ textDecoration: 'none'}}>
          Doodle!
        </Link>

        <Link to="/" style={{ textDecoration: 'none'}}>
          View All Drawings
        </Link>
    
      
    </div>
  );
};

export default Nav;