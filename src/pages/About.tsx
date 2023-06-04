import React from "react";
import Wrapper from "../sections/Wrapper";
import avatarImage from "../assets/Craig.png";

function About() {
  return <div className="about">
    <img src={avatarImage} alt="avatar"/>
    <h1 className="profile-text">Hi, I am Craig!</h1>
    <h2 className="profile-text">The creator of this awesome Pokedex</h2>
    <h4 className="profile-text">I created this project because I wanted to learn more about APIs and I'm a huge fan of Pokemon.</h4>
  </div>;
}

export default Wrapper(About);
