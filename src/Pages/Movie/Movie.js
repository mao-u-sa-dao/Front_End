import React from "react";

import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  getMovieByPartApi,
  getMoviesListApiById,
  getMovieByIdApi,
  getMoviesListApi,
} from "../../api/movies";
import { getCommentByIdApi, postCommentApi } from "../../api/comment";

import "./Movie.css";

export default function Movie() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";
  const [listMovies, setListMovies] = useState([]);
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
  // dùng để set khi người dùng chuyển sang phim tương tự sẽ load lại phim
  const [handleNext, setHandleNext] = useState(1);
  // lấy thông tin người dùng
  const [user, setUser] = useState(null);
  // lấy tổng số trang của comment
  const [totalPage, setTotalPage] = useState(0);
  // lấy ra trang số thứ page để hiển thị comment
  const [page, setPage] = useState(1);
  // Sử dụng navigate để chuyển hướng trang
  const navigate = useNavigate();
  // Lấy ra id trên đường link chuyển hướng
  let { id } = useParams();
  useEffect(() => {
    fetchData();
  }, [idMovie, handleNext]);
  // nếu Movie.length lớn hơn 0 thì sẽ lưu id1 là tập phim đầu tiên
  const movieId1 = Movie.length > 0 ? Movie[0].movieId : null;
  const [buttonComment, setButtonComment] = useState(0);
  const [commentPosted, setCommentPosted] = useState(false);

  useEffect(() => {
    if (movieId1 !== null) {
      fetchDataComment();
    }
    console.log(page);
  }, [page, idMovie, movieId1, buttonComment, commentPosted, handleNext]);

  const getCurrentDateTime = () => {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  };

  const postComment = async () => {
    if (user) {
      if (InputComment !== "") {
        const commentData = {
          commentContent: InputComment,
          movieId: movieId,
          accountId: user.ID,
          commentCreateTime: getCurrentDateTime(),
          account: null,
          movie: null,
        };
        await postCommentApi(commentData);
        setButtonComment(buttonComment + 1); // Tăng giá trị của buttonComment để gọi lại useEffect
        setCommentPosted(true); // Đánh dấu là đã post comment
        setInputComment("");
      }
      if (InputComment === "") {
        await Swal.fire({
          title: "Vui lòng nhập bình luận!",
          text: "Được đóng sau 2 giây...",
          timer: 2000,
          icon: "question",
        });
      }
    }
    if (user === null) {
      const confirmComment = await Swal.fire({
        title: "Chưa đăng nhập!",
        text: "Bạn có muốn đăng nhập?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4caf50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      });
      if (confirmComment.isConfirmed) {
        navigate("/login");
      }
    }
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // sử dụng jwtdecode để mã hóa token thành data
        setUser(jwtDecode(token));
      }
      setMovie(await getMovieByIdApi(id));
      setMovieListById(await getMoviesListApiById(id));
      if (idMovie) {
        setMovieByPart(await getMovieByPartApi(id, idMovie));
      }
      setListMovies(await getMoviesListApi());
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataComment = async () => {
    try {
      // nếu như người dùng đã ấn vào nút chuyển tập, sẽ lấy id của tập phim đó và hiển thị comment
      if (idMovie !== null) {
        setmovieId(idMovie);
        const response = await getCommentByIdApi(idMovie, page);
        setComment(response);
        setTotalPage(response.totalPages);
      }
      // nếu như người dùng chưa ấn chuyển tập, sẽ lấy id của tập phim đầu tiên để hiển thị comment
      if (idMovie === null && movieId1 !== null) {
        setmovieId(movieId1);
        const response = await getCommentByIdApi(movieId1, page);
        setComment(response);
        setTotalPage(response.totalPages);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const partClick = (movieId) => {
    setPartMovieSearchParams({ MovieId: movieId });
  };
  const handleNextMovie = () => {
    setHandleNext(handleNext + 1);
  };
  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setPage(page);
  };
  return (
    <div className="movie">
      <div className="movie-main text-white">
        <div className="container">
          <div className="video d-flex">
            {idMovie === null &&
              Movie &&
              Movie.slice(0, 1).map((item) => (
                <div className="video-main ">
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
              {listMovies.slice(0, 3).map((item, index) => (
                <div className="" key={index}>
                  <Link to={`/movie/${item.movieListId}`}>
                    <img
                      onClick={handleNextMovie}
                      className="img-fluid aspect-ratio-videolist"
                      src={urlImageList + item.avatarMovie}
                    />
                  </Link>
                </div>
              ))}
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
              Comment.items.map((item, index) => (
                <div key={index}>
                  <h3>{item.account?.accountName}</h3>
                  <p>{item.commentContent}</p>
                </div>
              ))
            )}
          </div>
          <ReactPaginate
            nextLabel="sau >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={Comment.pageSize}
            marginPagesDisplayed={2}
            pageCount={totalPage}
            previousLabel="< trước"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}
