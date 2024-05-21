import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  getMoviesListByCategoryApi,
  getMoviesListApiById,
} from "../../api/movies";
import { UserInfor, putInforUserApi } from "../../api/auth";
import { GetMovieOwnedByIdAccount } from "../../api/movieowned";
import { postBill } from "../../api/moviebill";
import { AddMovieOwned } from "../../api/movieowned";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import "./MovieWareHouse.css";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function MovieWareHouse() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";
  const [movieWareHouse, setMovieWareHouse] = useState([]);
  const { id } = useParams();
  const [getMovieOwned, setGetMovieOwned] = useState([]);
  const [user, setUser] = useState(null);
  const [inforUser, setInforUser] = useState(null);

  const [listMovieModal, setlistMovieModal] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

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
      // Gọi API để lấy danh sách phim theo danh mục (category) có id tương ứng
      const movies = await getMoviesListByCategoryApi(id);

      setMovieWareHouse(movies);
      console.log(movies);
    } catch (error) {
      console.error("Error fetching movie warehouse:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi tải danh sách phim.",
      });
    }
  };
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

  return (
    <div className="inventory movie-warehouse">
      <div className="container">
        {/* Nút quay lại trang chủ */}
        <Link to="/" className="btn btn-outline-primary mb-3">
          Quay lại trang chủ
        </Link>
        <h1 className="text-center text-light">Kho phim - Thể loại: {id}</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {movieWareHouse.map((movie, index) => (
            <div key={index} className="col">
              <div className="card h-100">
                <img
                  src={urlImageList + movie.avatarMovie}
                  className="card-img-top"
                  alt={movie.movieListName}
                />
                {/*  */}
                <div className="overlay d-flex flex-column text-light">
                  {movie.price !== 0 &&
                    (user &&
                    getMovieOwned.some(
                      (movieOwned) =>
                        movieOwned.movieListId === movie.movieListId
                    ) ? (
                      <>
                        <p>Đã mua</p>
                        <Link to={`/movie/${movie.movieListId}`}>
                          <a className="btn btn-outline-primary btn-sm">
                            Xem phim
                          </a>
                        </Link>
                      </>
                    ) : (
                      <>
                        <p className="price">
                          Giá:
                          <span className="text-decoration-underline">{`${movie.price.toLocaleString(
                            "en-US"
                          )}đ`}</span>
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                          onClick={() => ListMovieModal(movie.movieListId)}
                        >
                          Mua ngay
                        </button>
                      </>
                    ))}

                  {movie.price === 0 && (
                    <>
                      <p className="price">Miễn Phí.</p>
                      <Link to={`/movie/${movie.movieListId}`}>
                        <a className="btn btn-outline-primary btn-sm">
                          Xem phim
                        </a>
                      </Link>
                    </>
                  )}
                </div>
                {/*  */}
                <div className="card-body">
                  <h5 className="card-title">{movie.movieListName}</h5>
                  <p className="card-text">{movie.deseribe}</p>
                </div>
                <div className="card-footer">
                  {/* Logic mua phim và hiển thị modal tương tự như bạn đã có */}
                </div>
              </div>
            </div>
          ))}
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
