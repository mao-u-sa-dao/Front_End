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
} from "../../api/movies";
import { getCommentByIdApi, postCommentApi } from "../../api/comment";
import "./Movie.css";

export default function Movie() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";
  // sử dụng useSearch để tạo 1 search có chứa số tập của bộ phim khi click chuyển tập
  const [PartMovieSearchParams, setPartMovieSearchParams] = useSearchParams();
  // lấy ra số tập của bộ phim trong search đã được tạo trước đó
  const idMovie = PartMovieSearchParams.get("MovieId");
  // sử dụng call api để lấy ra những bộ phim theo id của listmovie
  const [Movie, setMovie] = useState([]);
  // call api để lấy thông tin movielist để hiển thị tên của bộ phim
  const [MovieListById, setMovieListById] = useState("");
  // call api để lấy ra bộ phim theo số tập (idMovie) và theo idlistmovie đã được truyền tới khi chuyển sang trang này(id)
  const [MovieByPart, setMovieByPart] = useState("");
  // sử dụng để lưu giá trị của người dùng khi nhập comment
  const [InputComment, setInputComment] = useState("");
  // call api lấy danh sách comment của nhưng tập đó để hiển thị comment
  const [Comment, setComment] = useState([]);
  // Lấy ra id của tập phim hiện tại để sử dụng thêm vào bảng comment
  const [movieId, setmovieId] = useState("");
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  useEffect(() => {
    fetchData();
  }, [idMovie]);
  // nếu Movie.length lớn hơn 0 thì sẽ lưu id1 là tập phim đầu tiên
  const movieId1 = Movie.length > 0 ? Movie[0].movieId : null;
  const [buttonComment, setButtonComment] = useState(0);
  const [commentPosted, setCommentPosted] = useState(false);

  useEffect(() => {
    if (movieId1 !== null) {
      fetchDataComment();
    }
  }, [idMovie, movieId1, buttonComment, commentPosted]);

  const commentData = {
    commentContent: InputComment,
    movieId: movieId,
    accountId: 1,
    commentCreateTime: "2024-04-13T01:00:00",
    account: null,
    movie: null,
  };

  const postComment = async () => {
    await postCommentApi(commentData);
    setButtonComment(buttonComment + 1); // Tăng giá trị của buttonComment để gọi lại useEffect
    setCommentPosted(true); // Đánh dấu là đã post comment
  };

  const fetchData = async () => {
    try {
      setMovie(await getMovieByIdApi(id));
      setMovieListById(await getMoviesListApiById(id));
      setMovieByPart(await getMovieByPartApi(id, idMovie));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataComment = async () => {
    try {
      if (idMovie !== null) {
        setmovieId(idMovie);
        setComment(await getCommentByIdApi(idMovie));
      } else {
        setmovieId(movieId1);
        setComment(await getCommentByIdApi(movieId1));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const partClick = (movieId) => {
    setPartMovieSearchParams({ MovieId: movieId });
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
              <Link to={`/movie/${MovieListById.movieListId}`}>
                <img
                  className="img-fluid aspect-ratio-videolist"
                  src={urlImageList + MovieListById.avatarMovie}
                />
              </Link>
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
          <div className="Comment mt-5 pb-5">
            <p>Comment: </p>
            <div className="input-group">
              <input
                type="text"
                value={InputComment}
                onChange={(e) => setInputComment(e.target.value)}
              />
              <button onClick={() => postComment()}>send</button>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : (
              Comment.map((item, index) => (
                <div key={index}>
                  <h3>{item.account?.accountName}</h3>
                  <p>{item.commentContent}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
