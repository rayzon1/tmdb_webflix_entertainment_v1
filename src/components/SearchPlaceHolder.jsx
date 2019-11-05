import React from "react";
// import clapperboard from "../images/clapperboard.png";
import Fade from "react-reveal/Fade";

export default function SearchPlaceholder({ icon, altText, desc }) {
  return (
    <div>
      <div style={{ height: "18vh" }} />
      <Fade>
        <p>
          <em>{desc}</em>
        </p>
        <img
          src={icon}
          alt={altText}
          style={{ width: "125px", height: "125px" }}
        />
      </Fade>
      <div style={{ height: "45vh" }} />
    </div>
  );
}
