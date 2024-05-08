import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Fragment } from "react";
import {
  getMoviesListApi,
  getMoviesListByCategoryApi,
  getMoviesListApiById,
} from "../../api/movies";
import { GetMovieOwnedByIdAccount } from "../../api/movieowned";
import { UserInfor, putInforUserApi } from "../../api/auth";
import { AddMovieOwned } from "../../api/movieowned";

import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import Banner1 from "../../assets/img/Banner.jpg";
import Banner2 from "../../assets/img/Banner-2.jpg";
import Banner3 from "../../assets/img/Banner-3.jpg";
import BannerQc from "../../assets/img/banner-quangcao/Banner-quangcao.jpg";
import bgr from "../../assets/img/1336451.jpg";

import "./Home.css";
export default function Home() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";

  const [isBuy, setIsBuy] = useState(() => {
    const storedIsBuy = localStorage.getItem("isBuy");
    return storedIsBuy ? JSON.parse(storedIsBuy) : {};
  });
  const [getMovieOwned, setGetMovieOwned] = useState([]);
  const [user, setUser] = useState(null);
  const [inforUser, setInforUser] = useState(null);
  const [listMovies, setListMovies] = useState([]);
  const [listMoviesByKiemHiep, setListMoviesByKiemHiep] = useState([]);
  const [listMovieModal, setlistMovieModal] = useState([]);

  useEffect(() => {
    fetchData();
    console.log(inforUser);
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // sử dụng jwtdecode để mã hóa token thành data
        const decodedToken = jwtDecode(token);
        // lưu data của user
        setUser(decodedToken);
        // và get infor của user để lấy số tiền
        setInforUser(await UserInfor(decodedToken.ID));
        setGetMovieOwned(await GetMovieOwnedByIdAccount(decodedToken.ID));
      }

      setListMovies(await getMoviesListApi());
      setListMoviesByKiemHiep(await getMoviesListByCategoryApi(2));
    } catch (error) {
      console.log("Lỗi :" + error);
    }
  };
  // hàm dùng để lấy thông tin của listmovie hiện tại khi click mua ngay và hiển thị modal
  const ListMovieModal = async (idListMovie) => {
    setlistMovieModal(await getMoviesListApiById(idListMovie));
  };

  // hàm cập nhật số tiền sau khi click mua
  const PutInforUser = async (movieId, idInforUser, priceMovieList) => {
    try {
      const confirmBuy = window.confirm(
        "Bạn có chắc chắn muốn mua bộ phim này?"
      );
      if (confirmBuy) {
        let total = inforUser.accountMoney - priceMovieList;
        let dataInforUser = {
          id: idInforUser,
          accountId: user.ID,
          accountMoney: total,
        };
        let dataMovieOwned = {
          movieListId: movieId,
          accountId: user.ID,
          price: priceMovieList,
          account: null,
          movieList: null,
        };
        await AddMovieOwned(dataMovieOwned);
        await putInforUserApi(inforUser.accountId, dataInforUser);
        const confirmSuccses = window.confirm("Mua thanh cong");
        if (confirmSuccses) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  const settings1 = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  return (
    <div className="home">
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
          <div className="row d-flex my-5">
            <Slider {...settings}>
              {listMovies &&
                listMovies.map((listMovie, index) => (
                  <div key={index} className="col-4 content ps-3">
                    <img
                      className="imghot img-fluid aspect-ratio-hot"
                      src={urlImageList + listMovie.avatarMovie}
                      alt={listMovie.movieListName}
                    />

                    <div className="overlay d-flex flex-column">
                      <p className="">Tên Phim: {listMovie.movieListName}</p>
                      {listMovie.price !== 0 &&
                        (user &&
                        getMovieOwned.some(
                          (movie) => movie.movieListId === listMovie.movieListId
                        ) ? (
                          <>
                            <p>Đã mua</p>
                            <Link to={`/informovie/${listMovie.movieListId}`}>
                              <a className="btn btn-outline-secondary btn-sm">
                                Xem phim
                              </a>
                            </Link>
                          </>
                        ) : (
                          <>
                            <p className="price">
                              Giá:
                              <span className="text-decoration-underline">{`${listMovie.price.toLocaleString(
                                "en-US"
                              )}đ`}</span>
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              onClick={() =>
                                ListMovieModal(listMovie.movieListId)
                              }
                            >
                              Mua ngay
                            </button>
                          </>
                        ))}

                      {listMovie.price === 0 && (
                        <Fragment>
                          <p className="price">Miễn Phí.</p>
                          <Link to={`/informovie/${listMovie.movieListId}`}>
                            <a className="btn btn-outline-secondary btn-sm">
                              Xem phim
                            </a>
                          </Link>
                        </Fragment>
                      )}
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* Banner quangcao */}
      <img src={BannerQc} className="aspect-ratio-bannerQc img-fluid"></img>

      {/* phim kiem hiep */}
      <div className="phimhot">
        <div className="container">
          <h2 className="title mt-5 ">Phim kiếm hiệp</h2>
          <div className="row d-flex my-5">
            <Slider {...settings1}>
              {listMovies &&
                listMovies.map((listMovie, index) => (
                  <div key={index} className="col-4 content ps-2">
                    <img
                      className="imghot img-fluid aspect-ratio-hot"
                      src={urlImageList + listMovie.avatarMovie}
                      alt={listMovie.movieListName}
                    />

                    <div className="overlay d-flex flex-column">
                      <p className="">Tên Phim: {listMovie.movieListName}</p>
                      {listMovie.price !== 0 &&
                        (user &&
                        getMovieOwned.some(
                          (movie) => movie.movieListId === listMovie.movieListId
                        ) ? (
                          <>
                            <p>Đã mua</p>
                            <Link to={`/informovie/${listMovie.movieListId}`}>
                              <a className="btn btn-outline-secondary btn-sm">
                                Xem phim
                              </a>
                            </Link>
                          </>
                        ) : (
                          <>
                            <p className="price">
                              Giá:
                              <span className="text-decoration-underline">{`${listMovie.price.toLocaleString(
                                "en-US"
                              )}đ`}</span>
                            </p>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              onClick={() =>
                                ListMovieModal(listMovie.movieListId)
                              }
                            >
                              Mua ngay
                            </button>
                          </>
                        ))}

                      {listMovie.price === 0 && (
                        <Fragment>
                          <p className="price">Miễn Phí.</p>
                          <Link to={`/informovie/${listMovie.movieListId}`}>
                            <a className="btn btn-outline-secondary btn-sm">
                              Xem phim
                            </a>
                          </Link>
                        </Fragment>
                      )}
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      <Footer />
      {/* Modal */}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Mua sản phẩm</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              {listMovieModal !== null && inforUser !== null && (
                <>
                  <p>
                    <span>Tên bộ phim: </span>
                    {listMovieModal.movieListName}
                  </p>
                  <p>
                    <span>Giá: </span>
                    {listMovieModal.price &&
                      `${listMovieModal.price.toLocaleString("en-US")}đ`}
                  </p>
                  <p>
                    <span>
                      Tiền trong tài khoản:
                      {`${inforUser.accountMoney.toLocaleString("en-US")}đ`}
                    </span>
                  </p>
                  <p>
                    <span>
                      Số tiền còn lại sau khi thanh toán:
                      {`${(
                        inforUser.accountMoney - listMovieModal.price
                      ).toLocaleString("en-US")}đ`}
                    </span>
                  </p>
                  <a
                    className="btn btn-primary"
                    onClick={() =>
                      PutInforUser(
                        listMovieModal.movieListId,
                        inforUser.id,
                        listMovieModal.price
                      )
                    }
                  >
                    Mua ngay
                  </a>
                </>
              )}
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
