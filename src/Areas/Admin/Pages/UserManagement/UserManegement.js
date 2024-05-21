import React, { useState, useEffect } from "react";
import { GetAllUser, GetUserById, putUserApi } from "../../api/AdminUser";
import ReactPaginate from "react-paginate";

import Swal from "sweetalert2";
import "./UserManegement.css";

export default function UserManegement() {
  const [user, setUser] = useState("");
  const [userById, setUserById] = useState([]);
  //   thong tin user
  const [userName, setUserName] = useState("");
  const [userPassWord, setUserPassWord] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCreateTime, setUserCreateTime] = useState("");

  //   page
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const fetchData = async () => {
    const user = await GetAllUser(page);
    setUser(user);
    setTotalPage(user.totalPages);
    setPageSize(user.pageSize);
  };
  const fetchDataUserById = async (idUser) => {
    const user = await GetUserById(idUser);
    setUserById(user);
    setUserName(user.accountName);
    setUserPassWord(user.accountPassword);
    setUserRole(user.accountRole);
    setUserEmail(user.accountGmail);
    setUserCreateTime(user.accountCreateTime);
  };
  const updateUser = async (idUser) => {
    try {
      const confirmUpdateUser = await Swal.fire({
        title: "Xác nhận thông tin",
        text: "Bạn có chắc chắn muốn cập nhật?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4caf50",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      });
      if (confirmUpdateUser.isConfirmed) {
        let dataUser = {
          accountId: idUser,
          accountName: userName,
          accountPassword: userPassWord,
          accountRole: userRole,
          accountGmail: userEmail,
          accountCreateTime: userCreateTime,
        };
        await putUserApi(dataUser);
        const confirmOk = await Swal.fire({
          title: "Thành Công!",
          text: "Bạn đã cập nhật thành công người dùng!.",
          icon: "success",
          confirmButtonColor: "#4caf50",
          confirmButtonText: "OK",
        });
        if (confirmOk.isConfirmed) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  const handlePageClick = (event) => {
    const page = event.selected + 1;
    setPage(page);
  };
  return (
    <>
      <div className="container">
        <h2> Quản lý người dùng</h2>
        <table className="table  table-hover">
          <thead className="table-success">
            <tr>
              <th>Tên người dùng</th>
              <th>Mật khẩu</th>
              <th>Địa chỉ email</th>
              <th>Role</th>
              <th>Thời gian tạo</th>
              <th></th>
            </tr>
          </thead>
          {user.items &&
            user.items.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{item.accountName}</td>
                  <td>{item.accountPassword}</td>
                  <td>{item.accountGmail}</td>
                  <td>{item.accountRole == 1 ? "Admin" : "Client"}</td>
                  <td>{item.accountCreateTime}</td>
                  <td>
                    <span
                      className="fa-regular fa-pen-to-square"
                      data-bs-toggle="modal"
                      data-bs-target="#myModalUpdate"
                      onClick={() => fetchDataUserById(item.accountId)}
                    />
                    <span className="fa-solid fa-trash-can ms-3 me-3" />
                    <span
                      class="fa-solid fa-circle-info"
                      data-bs-toggle="modal"
                      data-bs-target="#myModalInfor"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
        <ReactPaginate
          nextLabel="sau >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={pageSize}
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
      {/* modal infor */}
      <div className="modal fade" id="myModalInfor">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Thông tin người dùng!</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body"></div>
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
      {/* modal update */}
      <div className="modal fade" id="myModalUpdate">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Cập nhật người dùng!</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              {userById && (
                <form>
                  <div className="input-group">
                    <span className="input-group-text">Name</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tên"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-group-text">Password</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mật khẩu"
                      value={userPassWord}
                      onChange={(e) => setUserPassWord(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <span className="input-group-text">Role</span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Role"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <span className="input-group-text">@example.com</span>
                  </div>
                </form>
              )}
            </div>
            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <a
                className="btn btn-primary"
                onClick={() => updateUser(userById.accountId)}
              >
                Cập nhật
              </a>
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
    </>
  );
}
