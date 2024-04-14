import React from "react";
import { Fragment } from "react";
import Logo from "../../assets/icon/logo.svg";
import Facebook from "../../assets/icon/Facebook.svg";
import Instagram from "../../assets/icon/Instagram.svg";
import TikTok from "../../assets/icon/TikTok.svg";
import Youtube from "../../assets/icon/YouTube.svg";
import "./Footer.css";
export default function Footer() {
  return (
    <Fragment>
      <footer className="footer">
        <div className="container">
          <div className="row pt-5 text-white">
            <div className="logo col-3">
              <img class="img-fluid" src={Logo}></img>
              <p className="pt-3">
                Moon Play là dịch vụ được cung cấp bởi Công ty Cổ Phần Moon
                Play, thành viên của Công ty Cổ Phần Giải Trí và Giáo Dục Moon
              </p>
            </div>
            <div className="col-3 ">
              <h2 className=" pb-2">Giới thiệu</h2>
              <hr></hr>
              <p>Quy chế sử dụng dịch vụ</p>
              <p>Chính sách bảo mật</p>
              <p>Khuyến mãi</p>
            </div>
            <div className="col-3">
              <h2 className=" pb-2">Hỗ trợ</h2>
              <hr></hr>
              <p>0976169368</p>
              <p>Hoặc kết nối qua:</p>
            </div>
            <div className="col-3">
              <h2 className=" pb-2">Kết nối với chúng tôi:</h2>
              <hr></hr>
              <div className="contact d-flex">
                <img class="img-fluid" src={Facebook}></img>
                <img class="img-fluid" src={Instagram}></img>
                <img class="img-fluid" src={TikTok}></img>
                <img class="img-fluid" src={Youtube}></img>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
}
