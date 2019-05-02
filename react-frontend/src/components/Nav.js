import React from 'react';
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-bar">

      <input type="checkbox"/>

      <span></span>
      <span></span>
      <span></span>

      <ul className="menu">
        <Link to="/drawingpage" style={{ textDecoration: 'none'}}>
          <li>Doodle!</li>
        </Link>

        <Link to="/" style={{ textDecoration: 'none'}}>
          <li>View All Drawings</li>
        </Link>
      </ul>
      
    </div>
  );
};

export default Nav;