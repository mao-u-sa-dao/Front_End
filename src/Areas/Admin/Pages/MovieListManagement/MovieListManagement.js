import React, { useState, useEffect } from "react";
import { GetAllMovieList } from "../../api/AdminListMovie";
import ReactPaginate from "react-paginate";
import "./MovieListManagement.css";

export default function MovieListManagement() {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const fetchData = async () => {
    const movieList = await GetAllMovieList(page);
    setMovieList(movieList);
    setTotalPage(movieList.totalPages);
    setPageSize(movieList.pageSize);
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
        <h2> Quản lý phim</h2>
        <table className="table  table-hover">
          <thead className="table-success">
            <tr>
              <th>Tên bộ phim</th>
              <th>Ảnh</th>
              <th>Tên tác giả</th>
              <th>Thể loại</th>
              <th>Giá</th>
              <th></th>
            </tr>
          </thead>
          {movieList.items &&
            movieList.items.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{item.movieListName}</td>
                  <td>{item.avatarMovie}</td>
                  <td>{item.author.authorName}</td>
                  <td>{item.category.categoryName}</td>
                  <td>{item.price}</td>
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
