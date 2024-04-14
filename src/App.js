import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Movie from "./Pages/Movie/Movie";
import Home from "./Pages/Home/Home";
import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;
