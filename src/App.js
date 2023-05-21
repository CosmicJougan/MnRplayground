import "./App.css";
import React from "react";
import ResponsiveAppBar from "components/navBar/NavBar";
import LoginWrapper from "context/LoginContext";
//import Store from "Store";

function App() {
  return (
    <div className="App-header">
      <LoginWrapper>
        <ResponsiveAppBar />
      </LoginWrapper>
    </div>
  );
}

export default App;
