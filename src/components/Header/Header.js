import Logo from "../../assets/icon/logo.svg";
import "./Header.css";
import { Fragment } from "react";
function Header() {
  return (
    <Fragment>
      <header className="header fixed slide-in">
        <nav className="navbar py-3 navbar-expand custom-bg">
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
                  <button className="btn btn-secondary d-none d-sm-block">
                    Login
                  </button>
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
          <p>Account</p>
          <p>Account Info</p>
          <p>Logout</p>
          <button className="btn btn-secondary d-block d-sm-none" type="button">
            Login
          </button>
        </div>
      </div>
    </Fragment>
  );
}
export default Header;
