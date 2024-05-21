import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { UserInfor } from "../../api/auth";
import { Fragment, useEffect, useState } from "react";

import { getCategory } from "../../api/category";
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inforUser, setInforUser] = useState(null);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setCategory(await getCategory());
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setInforUser(await UserInfor(decodedToken.ID));
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Fragment>
      <header className="header fixed slide-in sticky-top">
        <nav className="navbar py-3 navbar-expand custom-bg ">
          <div className="container-fluid">
            <div className="container">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                {/* icon Menu collapse */}
                <button
                  class="navbar-toggler d-block "
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvas"
                >
                  <span class="navbar-toggler-icon "></span>
                </button>
                <ul className="navbar-nav ms-lg-5 gap-sm-1 gap-lg-5 me-auto mb-lg-0">
                  <li className="nav-item ">
                    <Link className="text-decoration-none" to={"/"}>
                      <a
                        className="nav-link active text-white "
                        aria-current="page"
                      >
                        Trang chủ
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link text-white dropdown-toggle"
                      href="#"
                      aria-expand="false"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      Kho Phim
                    </a>
                    <ul className="dropdown-menu">
                      {category &&
                        category.map((item, index) => (
                          <li key={index}>
                            <Link to={`/moviewarehouse/${item.categoryId}`}>
                              <a className="dropdown-item">
                                {item.categoryName}
                              </a>
                            </Link>
                          </li>
                        ))}
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="#"
                    >
                      Liên Hệ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      aria-current="page"
                      href="#"
                    >
                      Giới Thiệu
                    </a>
                  </li>
                </ul>
                <form
                  className="d-flex form-right gap-sm-0 gap-lg-5"
                  role="search"
                >
                  <div className="input-group input-group-sm">
                    <input
                      className="form-control d-none d-sm-block"
                      type="search"
                      placeholder="Tìm kiếm"
                      aria-label="Search"
                    />
                    <span className="input-group-text d-none d-sm-block">
                      <a href="#">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </a>
                    </span>
                  </div>
                  {user ? (
                    <button
                      onClick={() => Logout()}
                      className="btn btn-log text-light d-none d-sm-block"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link className="text-decoration-none" to={`/Login`}>
                      <button className="btn btn-log btn-secondary d-none d-sm-block">
                        Login
                      </button>
                    </Link>
                  )}
                </form>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* item menu */}
      <div className="offcanvas offcanvas-start " id="offcanvas">
        <div className="offcanvas-header">
          <h2 className="offcanvas-title">Menu</h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <hr className="text-black " />
        <div className="offcanvas-body">
          {user !== null && inforUser !== null ? (
            <div>
              <p>
                Xin chào: <strong>{user.unique_name}</strong>
              </p>
              <hr className="text-black w-50" />
              <p>
                Tổng tiền:{" "}
                <strong>{`${inforUser.accountMoney.toLocaleString(
                  "en-US"
                )}đ`}</strong>
              </p>
              <hr className="text-black w-50" />
              <div className="dropdown">
                <span className="fa fa-user dropdown-toggle"></span>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      onClick={() => Logout()}
                      href="#"
                      className="dropdown-item"
                      data-bs-dismiss="offcanvas"
                    >
                      Logout
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Thông tin user
                    </a>
                  </li>
                  <li>
                    <Link
                      className="text-decoration-none"
                      to={`/moviesuserowned`}
                    >
                      <button
                        className="dropdown-item"
                        data-bs-dismiss="offcanvas"
                      >
                        Kho phim sở hữu
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <p>Account</p>
              <Link className="text-decoration-none" to={`/Login`}>
                <button
                  className="btn btn-secondary d-block d-sm-none"
                  type="button"
                >
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </Fragment>
  );
}
export default Header;
