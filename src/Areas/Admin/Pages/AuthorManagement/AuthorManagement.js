import React, { useState, useEffect } from "react";
import { GetAllAuthor } from "../../api/AdminAuthor";
import ReactPaginate from "react-paginate";
import "./AuthorManagement.css";

export default function AuthorManagement() {
  const [author, setAuthor] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const fetchData = async () => {
    const author = await GetAllAuthor(page);
    setAuthor(author);
    setTotalPage(author.totalPages);
    setPageSize(author.pageSize);
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
        <h2> Quản lý tác giả</h2>
        <table className="table  table-hover">
          <thead className="table-success">
            <tr>
              <th>ID</th>
              <th>Tên tác giả</th>
              <th></th>
            </tr>
          </thead>
          {author.items &&
            author.items.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{item.authorId}</td>
                  <td>{item.authorName}</td>
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
