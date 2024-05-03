import React from "react";
import { Fragment } from "react";
import {
  getMoviesListApi,
  getMoviesListByCategoryApi,
  getMoviesListApiById,
} from "../../api/movies";
import { UserInfor, putInforUserApi } from "../../api/auth";

import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import Banner1 from "../../assets/img/Banner.jpg";
import Banner2 from "../../assets/img/Banner-2.jpg";
import Banner3 from "../../assets/img/Banner-3.jpg";
import BannerQc from "../../assets/img/banner-quangcao/Banner-quangcao.jpg";

import "./Home.css";
export default function Home() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";

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
  const PutInforUser = async (idUser, priceMovieList) => {
    let total = inforUser.accountMoney - priceMovieList;
    let data = {
      id: inforUser.id,
      accountId: inforUser.accountId,
      accountMoney: total,
    };
    await putInforUserApi(inforUser.accountId, data);
    window.location.reload();
  };
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
              <div className="col-4 content">
                <img
                  className="imghot img-fluid aspect-ratio-hot"
                  src={urlImageList + listMovie.avatarMovie}
                />

                <div className="overlay d-flex flex-column">
                  <p className="">Tên Phim: {listMovie.movieListName}</p>
                  {listMovie.price != 0 && (
                    <Fragment>
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
                        onClick={() => ListMovieModal(listMovie.movieListId)}
                      >
                        Mua ngay
                      </button>
                    </Fragment>
                  )}
                  {listMovie.price == 0 && (
                    <Fragment>
                      <p className="price">Miễn Phí.</p>
                      <Link to={`/movie/${listMovie.movieListId}`}>
                        <a className="btn btn-outline-secondary btn-sm">
                          Xem phim
                        </a>
                      </Link>
                    </Fragment>
                  )}
                </div>
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
              <div className="col ">
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
                        inforUser.accountMoney - (listMovieModal.price || 0)
                      ).toLocaleString("en-US")}đ`}
                    </span>
                  </p>
                  <a
                    className="btn btn-primary"
                    onClick={() => PutInforUser(user.ID, listMovieModal.price)}
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
    </Fragment>
  );
}
