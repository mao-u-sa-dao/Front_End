import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { UserInfor } from "../../api/auth";
import { Fragment, useEffect, useState } from "react";
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inforUser, setInforUser] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
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
                  class="navbar-toggler d-block"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvas"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <ul className="navbar-nav ms-lg-5 gap-sm-1 gap-lg-5 me-auto mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active text-black"
                      aria-current="page"
                      href="#"
                    >
                      Trang chủ
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link text-black dropdown-toggle"
                      href="#"
                      aria-expand="false"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      Kho Phim
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Anime
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Truyền Hình
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Kiếm Hiệp
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-black"
                      aria-current="page"
                      href="#"
                    >
                      Liên Hệ
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-black"
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
                      className="btn btn-secondary d-none d-sm-block"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link className="text-decoration-none" to={`/Login`}>
                      <button className="btn btn-secondary d-none d-sm-block">
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
      <div className="offcanvas offcanvas-start" id="offcanvas">
        <div className="offcanvas-header">
          <h1 className="offcanvas-title">Menu</h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          {user !== null && inforUser !== null && (
            <div>
              {user.unique_name} Tổng tiền:{" "}
              <p>{`${inforUser.accountMoney.toLocaleString("en-US")}đ`}</p>
              <div className="dropdown">
                <span className="fa fa-user dropdown-toggle"></span>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      onClick={() => Logout()}
                      href=""
                      className="dropdown-item"
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
                    <a className="dropdown-item" href="#">
                      Kho phim sở hữu
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}{" "}
          {user === null && inforUser === null && (
            <Fragment>
              <p>Account</p>
              <Link className="text-decoration-none" to={`/Login`}>
                <button
                  className="btn btn-secondary d-block d-sm-none"
                  type="button"
                >
                  Login
                </button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
export default Header;
