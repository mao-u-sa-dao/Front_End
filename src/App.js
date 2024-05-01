import React from "react";
import AnimatedPage from "./components/AnimatedPage/AnimatedPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
import Movie from "./Pages/Movie/Movie";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Home />
            </AnimatedPage>
          }
        />
        <Route
          path="/about"
          element={
            <AnimatedPage>
              <About />
            </AnimatedPage>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <AnimatedPage>
              <Movie />
            </AnimatedPage>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <Login />
            </AnimatedPage>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
