import ReactPaginate from "react-paginate";

const TableUser = ({
  listUser,
  handleBtnUpdate,
  handleBtnView,
  handleBtnDel,
  fetchListUser,
  pageCount,
}) => {
  const handlePageClick = (event) => {
    fetchListUser(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Email</th>
            <th scope="col">Tên người dùng</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => (
              <tr key={`table-user-${index}`}>
                <td>{index + 1}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleBtnDel(item)}
                  >
                    Xóa
                  </button>
                  <button
                    className="btn btn-warning mx-2"
                    onClick={() => handleBtnUpdate(item)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBtnView(item)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}

          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={4}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination justify-content-center">
      <ReactPaginate
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Prev"
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
};

export default TableUser;
