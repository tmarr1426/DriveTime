import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  let location = useLocation();
  console.log(location);
  let text = "#C1C8E4";

  return (
    <div className="w3-panel w3-card-4 margin-l-p margin-r-p w3-display-bottommiddle"  style={{backgroundColor: "#242424", marginLeft:"10%", marginRight:"4%"}} >
      <div className="w3-container">
        <div style={{ display: "flex", gap: "1em" }} >
          {/* <Link to="/home" style={{ color: text }}>
          Home
        </Link> */}
      <Link to="/about" style={{ color: text }}>
        About
      </Link>
      <Link to="/contact_us" style={{ color: text }}>
        Contact
      </Link>
    </div>
    </div>
    </div>
  );
};


export default Footer;
