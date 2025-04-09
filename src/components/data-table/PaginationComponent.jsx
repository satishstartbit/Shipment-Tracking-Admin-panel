import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./ThemeDataTable.css";
const PaginationComponent = ({
  totalRows,
  changePage,
  currentRows,
  currentPage,
}) => {
  let totalPages = Math.ceil(totalRows / currentRows);
  const getPageNumbers = () => {
    const pageArray = [];
    const maxPagesToShow = 3; // You can adjust this number based on your design

    if (totalPages <= maxPagesToShow) {
      // If total pages are less than or equal to maxPagesToShow, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i);
      }
    } else {
      // If total pages are more than maxPagesToShow
      const middleIndex = Math.floor(maxPagesToShow / 2);
      const startPage = Math.max(1, currentPage - middleIndex);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        // Add ellipsis at the beginning
        pageArray.push(1, "...");
      }

      // Add pages within the range
      for (let i = startPage; i <= endPage; i++) {
        pageArray.push(i);
      }

      if (endPage < totalPages) {
        // Add ellipsis at the end
        pageArray.push("...", totalPages);
      }
    }

    return pageArray;
  };

  return (
    <Pagination aria-label="Data-table pagination">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink
          onClick={() => {
            changePage(currentPage - 1);
          }}
        >
          Previous
        </PaginationLink>
      </PaginationItem>
      {getPageNumbers().map((page, index) => (
        <PaginationItem key={index + "index_key"} active={page === currentPage}>
          {page === "..." ? (
            <PaginationLink disabled> {page}</PaginationLink>
          ) : (
            <PaginationLink onClick={() => changePage(page)}>
              {page}
            </PaginationLink>
          )}
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink
          onClick={() => {
            changePage(currentPage + 1);
          }}
        >
          Next
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  );
};
export default PaginationComponent;

