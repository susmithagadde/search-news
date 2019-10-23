import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewsList from "./components/Lists/NewsList";
import NewsDetails from "./components/Details/NewsDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="sub-app" id="sub-app">
          <Route path="/" strict exact component={NewsList} />
          <Route path="/details" component={NewsDetails} />
        </div>
      </div>
    </Router>
  );
}

export default App;
