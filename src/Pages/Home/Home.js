import React from "react";
import axios from "axios";
import { Fragment } from "react";
import { getMoviesListApi, getMoviesListByCategoryApi } from "../../api/movies";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import Title from "../../assets/icon/title-banner.svg";
import Banner1 from "../../assets/img/Banner.jpg";
import Banner2 from "../../assets/img/Banner-2.jpg";
import Banner3 from "../../assets/img/Banner-3.jpg";
import Hot1 from "../../assets/img/avatar-list-movie/hot1.jpg";
import Hot2 from "../../assets/img/avatar-list-movie/hot2.jpg";
import Hot3 from "../../assets/img/avatar-list-movie/hot3.jpg";
import BannerQc from "../../assets/img/banner-quangcao/Banner-quangcao.jpg";

import "./Home.css";
export default function Home() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";
  // call api get list movies
  const [listMovies, setListMovies] = useState([]);
  const [listMoviesByKiemHiep, setListMoviesByKiemHiep] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setListMovies(await getMoviesListApi());
      setListMoviesByKiemHiep(await getMoviesListByCategoryApi(2));
    } catch (error) {
      console.log("Lỗi :" + error);
    }
  };
  console.log(listMovies);
  return (
    <Fragment>
      <Header />
      {/* Carousel */}
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        {/* dot */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="0"
            className="active"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="1"
          ></button>
          <button
            type="button"
            data-bs-target="#carousel"
            data-bs-slide-to="2"
          ></button>
        </div>
        {/* the slideshow/carousel */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={Banner1}
              alt=""
              className="d-block img-fluid aspect-ratio-banner"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Banner2}
              alt=""
              className="d-block img-fluid aspect-ratio-banner"
            />
          </div>
          <div className="carousel-item">
            <img
              src={Banner3}
              alt=""
              className="d-block img-fluid aspect-ratio-banner"
            />
          </div>
        </div>
        {/* icon prev next */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
      {/* phim hot */}
      <div className="phimhot">
        <div className="container">
          <h2 className="title mt-5">Phim Hot</h2>
          <div className=" row d-flex my-5">
            {listMovies.slice(0, 3).map((listMovie) => (
              <div className="col-4">
                <Link to={`/movie/${listMovie.movieListId}`}>
                  <img
                    className=" img-fluid aspect-ratio-hot"
                    src={urlImageList + listMovie.avatarMovie}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Banner quangcao */}
      <img src={BannerQc} className="aspect-ratio-bannerQc img-fluid"></img>

      {/* phim kiem hiep */}
      <div className="phimkiemhiep">
        <div className="container">
          <h2 className="title  mt-5 ">Phim Kiếm Hiệp</h2>
          <div className="row d-flex my-5">
            {listMovies.slice(0, 4).map((listMovie) => (
              <div className="col">
                <Link to={`/movie/${listMovie.movieListId}`}>
                  <img
                    className=" img-fluid aspect-ratio-kiemhiep"
                    src={urlImageList + listMovie.avatarMovie}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
