import React from "react";

import { Fragment } from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  getMovieByPartApi,
  getMoviesListApiById,
  getMovieByIdApi,
  getCommentByIdApi,
} from "../../api/movies";
import "./Movie.css";

export default function Movie() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";

  const [PartMovieSearchParams, setPartMovieSearchParams] = useSearchParams();
  const idMovie = PartMovieSearchParams.get("movie");
  const [Movie, setMovie] = useState([]);
  const [MovieListById, setMovieListById] = useState("");
  const [MovieByPart, setMovieByPart] = useState("");
  const [Comment, setComment] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    fetchData();
  }, [idMovie]);
  useEffect(() => {
    fetchData1();
  }, []);

  const fetchData = async () => {
    try {
      setMovie(await getMovieByIdApi(id));
      setMovieListById(await getMoviesListApiById(id));
      setMovieByPart(await getMovieByPartApi(id, idMovie));
      if (idMovie !== null) {
        const comments = await getCommentByIdApi(idMovie);
        setComment(comments["$values"]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData1 = async () => {
    if (idMovie === null) {
      const comments = await getCommentByIdApi(1);
      setComment(comments["$values"]);
    }
  };

  const partClick = (idMovie) => {
    setPartMovieSearchParams({ movie: idMovie });
  };

  return (
    <Fragment>
      <Header />
      <div className="movie text-white">
        <div className="container">
          <div className="video d-flex">
            {idMovie === null &&
              Movie &&
              Movie.slice(0, 1).map((item) => (
                <div className="video-main">
                  <iframe
                    className="responsive-iframe img-fluid"
                    src={item.movieUrl}
                    allow="autoplay"
                  ></iframe>
                  <div className="content">
                    <h2 className="mt-3">{MovieListById.movieListName}</h2>
                    <h2 className="mt-2">Tập: {item.moviePart}</h2>
                    <p className="desc">{item.deseribe}</p>
                  </div>
                </div>
              ))}
            {idMovie !== null && MovieByPart && (
              <div className="video-main">
                <iframe
                  className="responsive-iframe img-fluid"
                  src={MovieByPart.movieUrl}
                  allow="autoplay"
                ></iframe>
                <div className="content">
                  <h2 className="mt-3">{MovieListById.movieListName}</h2>
                  <h2 className="mt-2">Tập: {MovieByPart.moviePart}</h2>
                  <p className="desc">{MovieByPart.deseribe}</p>
                </div>
              </div>
            )}
            <div className=" list-video ms-3">
              <p className="desc">Các phim tương tự</p>
              <img
                className="img-fluid aspect-ratio-videolist"
                src={urlImageList + MovieListById.avatarMovie}
              />
              <img
                className="img-fluid aspect-ratio-videolist"
                src={urlImageList + MovieListById.avatarMovie}
              />
              <img
                className="img-fluid aspect-ratio-videolist"
                src={urlImageList + MovieListById.avatarMovie}
              />
            </div>
          </div>
          {/* part */}
          <p className="desc">Danh sách tập</p>
          <div className=" d-flex gap-1">
            {Movie.map((item, index) => (
              <div className="" key={index}>
                <button
                  onClick={() => partClick(item.movieId)}
                  className="btn btn-light btn-sm"
                >
                  {item.moviePart}
                </button>
              </div>
            ))}
          </div>
          {/* Comment */}
          <div className="Comment mt-5">
            {Comment.map((item, index) => (
              <div key={index}>
                <h3>{item.Account?.AccountName}</h3>
                <p>{item.CommentContent}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
