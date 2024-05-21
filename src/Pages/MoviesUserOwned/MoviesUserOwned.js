import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GetMovieOwnedByIdAccount } from "../../api/movieowned";
import "./MoviesUserOwned.css";

export default function MoviesUserOwned() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";
  const [getMovieOwned, setGetMovieOwned] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // sử dụng jwtdecode để mã hóa token thành data
        const decodedToken = jwtDecode(token);
        setGetMovieOwned(await GetMovieOwnedByIdAccount(decodedToken.ID));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="movieOwned">
        <div className="container mt-3">
          <h2 className="text-light">Các phim đã sở hữu</h2>
          <div className="row">
            {getMovieOwned.length > 0 ? (
              getMovieOwned.map((item, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card">
                    <img
                      className="card-img-top img-fluid aspect-ratio-hot"
                      src={urlImageList + item.movieList.avatarMovie}
                      alt="Card image"
                    />
                    <div className="card-body">
                      <h4 className="card-title">
                        {item.movieList.movieListName}
                      </h4>
                      <p className="card-text">Giá: {item.price}</p>
                      <Link to={`/movie/${item.movieList.movieListId}`}>
                        <a className="btn btn-primary">Chi tiết</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="mt-5 mb-5 text-light pt-5 pb-5">
                {" "}
                Chưa sở hữu bộ phim nào!
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
