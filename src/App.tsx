import React from "react";
import NavBar from "./sections/NavBar";
import Wrapper from "./sections/Wrapper";
import Footer from "./sections/Footer";
import Background from "./components/Background";
import "./scss/index.scss";

function App() {
  return (
    <div className="main-container">
      <Background />
      <div className="app">
        <NavBar />
        <Wrapper />
        <Footer />
      </div>
    </div>
  );
}

export default App;
