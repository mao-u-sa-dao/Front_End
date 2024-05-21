import React, { useState, useEffect } from "react";
import { GetAllBillMovie } from "../../api/AdminBillMovie";
import ReactPaginate from "react-paginate";
import "./BillManagement.css";

export default function BillManagement() {
  const url = process.env.REACT_APP_URL_API;
  const urlImageList = url + "/img/list-movies-avatar/";
  const [billMovie, setBillMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const fetchData = async () => {
    const movieBill = await GetAllBillMovie(page);
    setBillMovie(movieBill);
    setTotalPage(movieBill.totalPages);
    setPageSize(movieBill.pageSize);
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
        <h2> Quản lý bill</h2>
        <table className="table  table-hover">
          <thead className="table-success">
            <tr>
              <th>Tên sản phẩm</th>
              <th>Ảnh sản phẩm</th>
              <th>Giá</th>
              <th>Người dùng đã mua</th>
              <th>Thời gian tạo</th>
              <th></th>
            </tr>
          </thead>
          {billMovie.items &&
            billMovie.items.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{item.movieList.movieListName}</td>
                  <td>
                    <img
                      className="product-image"
                      src={urlImageList + item.movieList.avatarMovie}
                    />
                  </td>
                  <td>{item.movieList.price}</td>
                  <td>{item.account.accountName}</td>
                  <td>{item.billCreateTime}</td>
                  <td>
                    <span className="fa-regular fa-pen-to-square" />
                    <span className="fa-solid fa-trash-can ms-3" />
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
    </>
  );
}
