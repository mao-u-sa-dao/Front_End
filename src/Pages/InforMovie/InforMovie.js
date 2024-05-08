import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Img from "../../assets/img/avatar-list-movie/hot1.jpg";
import { getMoviesListApiById } from "../../api/movies";
import "./InforMovie.css";

export default function InforMovie() {
  let { id } = useParams();
  const [movieList, setMovieList] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setMovieList(await getMoviesListApiById(id));
  };
  console.log(movieList);
  return (
    <>
      <Header />
      <div className="container">
        <div className="infor-movie row">
          <h2>{movieList.movieListName}</h2>
          <div className="item-left d-flex flex-column align-items-start col-6">
            <img className="img-fluid aspect-ratio" src={Img} alt="Movie" />
            <Link to={`/movie/${movieList.movieListId}`}>
              <button className="btn btn-primary mt-3">Xem Ngay</button>
            </Link>
          </div>
          <div className="item-right col-6 mt-5">
            <h2 className="title"></h2>
            <div className="row">
              <div className="col-6">Giá:</div>
              <div className="col-6">
                {movieList.price &&
                  `${movieList.price.toLocaleString("en-US")}đ`}
              </div>
              <div className="col-6">Thể loại:</div>
              <div className="col-6">
                {movieList.category && movieList.category.categoryName}
              </div>
              <div className="col-6">Tác Giả:</div>
              <div className="col-6">
                {movieList.author && movieList.author.authorName}
              </div>
            </div>
          </div>
          <h3>Mô tả:</h3>
          <div className="desc mb-4 text-light">{movieList.deseribe}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
