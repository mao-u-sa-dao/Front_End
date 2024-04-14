import React from "react";

import { Fragment } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getMovieByIdApi } from "../../api/movies";
import "./Movie.css";

export default function Movie() {
  const [Movie, setMovie] = useState([]);
  let { id } = useParams();
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

      <div className="movie text-white">
        <div className="container">
          {Movie.slice(0, 1).map((item) => (
            <div className="content">
              <iframe
                src={item.movieUrl}
                width="1032"
                height="557"
                allow="autoplay"
              ></iframe>
              <h2 className="title fs-2 mt-5">{item.deseribe}</h2>
            </div>
          ))}

          {/* part */}
          <p>Danh sách tập</p>
          <div className=" d-flex gap-1">
            {Movie.map((item) => (
              <div className="" key={item.movieId}>
                <button className="btn btn-light btn-sm">
                  {item.moviePart}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
}
