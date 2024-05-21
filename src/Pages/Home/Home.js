import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from "sweetalert2";
import { format } from "date-fns";

import { getMoviesListApi, getMoviesListApiById } from "../../api/movies";
import { GetMovieOwnedByIdAccount } from "../../api/movieowned";
import { UserInfor, putInforUserApi } from "../../api/auth";
import { AddMovieOwned } from "../../api/movieowned";
import { postBill } from "../../api/moviebill";

import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import "./Home.css";

export default function Home() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";

  const [getMovieOwned, setGetMovieOwned] = useState([]);
  const [user, setUser] = useState(null);
  const [inforUser, setInforUser] = useState(null);
  const [listMovies, setListMovies] = useState([]);
  const [listMovieModal, setlistMovieModal] = useState([]);

  useEffect(() => {
    fetchData();
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

        const tokenExpiration = decodedToken.exp * 1000; // Convert về milliseconds
        const currentTime = new Date().getTime();
        if (currentTime > tokenExpiration) {
          // Nếu token đã hết hạn, xóa token và thông tin người dùng
          localStorage.removeItem("token");
        }
      }
      if (token == null) {
        localStorage.removeItem("token");
      }
      setListMovies(await getMoviesListApi());
    } catch (error) {
      console.log("Lỗi :" + error);
    }
  };
  // hàm dùng để lấy thông tin của listmovie hiện tại khi click mua ngay và hiển thị modal
  const ListMovieModal = async (idListMovie) => {
    setlistMovieModal(await getMoviesListApiById(idListMovie));
  };

  const getCurrentDateTime = () => {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  };
  // hàm cập nhật số tiền sau khi click mua
  const PutInforUser = async (idMovieList, idInforUser, priceMovieList) => {
    try {
      const confirmBuy = await Swal.fire({
        title: "Xác nhận mua hàng",
        text: "Bạn có chắc chắn muốn mua bộ phim này?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4caf50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      });

      if (confirmBuy.isConfirmed) {
        if (inforUser.accountMoney < priceMovieList) {
          await Swal.fire({
            title: "Tài khoản không đủ số dư",
            text: "Vui lòng nạp thêm tiền!",
            icon: "warning",
          });
        }
        if (inforUser.accountMoney > priceMovieList) {
          let total = inforUser.accountMoney - priceMovieList;
          let dataInforUser = {
            id: idInforUser,
            accountId: user.ID,
            accountMoney: total,
          };
          let dataMovieOwned = {
            movieListId: idMovieList,
            accountId: user.ID,
            price: priceMovieList,
            account: null,
            movieList: null,
          };
          let dataBill = {
            movieListId: idMovieList,
            accountId: user.ID,
            billCreateTime: getCurrentDateTime(),
          };
          await AddMovieOwned(dataMovieOwned);
          await putInforUserApi(inforUser.accountId, dataInforUser);
          await postBill(dataBill);
          const confirmOk = await Swal.fire({
            title: "Mua thành công",
            text: "Bộ phim đã được thêm vào danh sách của bạn.",
            icon: "success",
            confirmButtonColor: "#4caf50",
            confirmButtonText: "OK",
          });
          if (confirmOk.isConfirmed) {
            window.location.reload();
          }
        }
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  const settings1 = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  return (
    <div className="home">
      <div className="container">
        <div className="content-new">
          <h1 className="text-light mt-5 title-1">Quân anime</h1>
          <p className="desc text-light">
            Website cung cấp review phim anime siêu hay
          </p>
          <button className="btn text-light mt-3">Xem Ngay</button>
        </div>
      </div>
      {/* hot movie */}
      <div className="phimhot mt-5 pt-5 my-5">
        <div className="container">
          <h2 className="title text-light">Hot Movie</h2>
          <div className="row d-flex">
            <Slider {...settings1}>
              {listMovies &&
                listMovies.map((listMovie, index) => (
                  <div key={index} className="col-4 content ps-3">
                    <img
                      className="imghot img-fluid aspect-ratio-hot rounded shadow "
                      src={urlImageList + listMovie.avatarMovie}
                      alt={listMovie.movieListName}
                    />

                    <div className="overlay d-flex flex-column text-light">
                      <p className="">Tên Phim: {listMovie.movieListName}</p>
                      {listMovie.price !== 0 &&
                        (user &&
                        getMovieOwned.some(
                          (movie) => movie.movieListId === listMovie.movieListId
                        ) ? (
                          <>
                            <p>Đã mua</p>
                            <Link to={`/movie/${listMovie.movieListId}`}>
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
                        <>
                          <p className="price">Miễn Phí.</p>
                          <Link to={`/movie/${listMovie.movieListId}`}>
                            <a className="btn btn-outline-secondary btn-sm">
                              Xem phim
                            </a>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div className="modal fade" id="myModal">
        <div className="modal-dialog">
          {user ? (
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
          ) : (
            <div className="modal-content">
              {/* <!-- Modal Header --> */}
              <div className="modal-header">
                <h4 className="modal-title">Vui lòng đăng nhập!</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              {/* <!-- Modal body --> */}

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
          )}
        </div>
      </div>
    </div>
  );
}
