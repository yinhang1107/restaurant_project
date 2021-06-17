import React from "react";

import "./styles.css";

const Hero = ({ backgroundImage, heading1, heading2, link, buttonName }) => {
  return (
    <section
      className="container-fluid hero hero__image d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero__banner px-1">
        <header>
          <h1>{heading1}</h1>
          {heading2 && <h2>{heading2}</h2>}
        </header>
        {buttonName && (
          <a href={link}>
            <button className="btn btn-outline-light btn__hero">
              {buttonName}
            </button>
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
