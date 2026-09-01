import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-button pagination-prev"
        disabled={currentPage === 1}
        onClick={() =>
          onPageChange(currentPage - 1)
        }
      >
        <FiChevronLeft size={16} />
        <span>Previous</span>
      </button>

      <div className="pagination-pages">
        {pages.map((page) => (
          <button
            key={page}
            className={`pagination-page ${
              currentPage === page
                ? "active"
                : ""
            }`}
            onClick={() =>
              onPageChange(page)
            }
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-button pagination-next"
        disabled={currentPage === totalPages}
        onClick={() =>
          onPageChange(currentPage + 1)
        }
      >
        <span>Next</span>
        <FiChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;