import React from "react";

import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getMovieByIdApi } from "../../api/movies";

export default function About() {
  const [Movie, setMovie] = useState([]);
  let { id } = useParams();
  const [User, setUser] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setMovie(await getMovieByIdApi(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <h1>{Movie.deseribe}</h1>
      <iframe
        src={Movie.movieUrl}
        width="640"
        height="480"
        allow="autoplay"
      ></iframe>
      <Footer />
    </Fragment>
  );
}
