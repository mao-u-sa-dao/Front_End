import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../api/auth";

import "./Login.css";
export default function Login() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Đánh dấu là đã mount
  }, []);

  const [UserName, setUserName] = useState("");
  const [UserPassWord, setUserPassWord] = useState("");
  const [Token, setToken] = useState("");
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const LoginUser = async () => {
    try {
      const response = await UserLogin(UserName, UserPassWord);
      if (response && response.token) {
        // Nếu token chưa hết hạn, lưu token vào state và localStorage
        setToken(response.token);
        localStorage.setItem("token", response.token);
      }
      setLoading(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <h2 className="text-light mt-5">Đăng Nhập</h2>
        <div className="mt-3 mb-3">
          <label for="email">Tên tài khoản:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Nhập tên tài khoản"
            name="email"
            value={UserName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <div className="mb-3">
            <label for="pwd">PassWord:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Nhập mật khẩu"
              name="pswd"
              value={UserPassWord}
              onChange={(e) => setUserPassWord(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-5 mt-5 "
            onClick={() => LoginUser()}
          >
            Đăng Nhập
          </button>
          {Loading ? <div>Loading....</div> : <p>{Token}</p>}
        </div>
      </div>
    </Fragment>
  );
}
