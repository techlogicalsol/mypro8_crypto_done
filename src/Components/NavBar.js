import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function NavBar(){



    return(
        <>

<nav className="navbar navbar-expand-sm mynav">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">CRYPTO</Link>
    <button className="navbar-toggler mybtn" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span className="myicon">
      <i class="fas fa-sliders-h"></i>
      </span>
    </button>
    <div className="collapse navbar-collapse" id="collapsibleNavbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact">Contact</Link>
        </li>

        {/* <div class="form-group">
 
  <select class="form-control" id="sel1">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
  </select>
</div> */}


      </ul>
    </div>
  </div>
</nav>

        </>
    )
}

export default NavBar