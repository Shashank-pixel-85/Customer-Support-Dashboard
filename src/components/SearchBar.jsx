import { FiSearch, FiX } from "react-icons/fi";

function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="search-wrapper">
      <FiSearch className="search-icon" size={19} />

      <input
        type="text"
        placeholder="Search by customer, subject or ticket ID..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />

      {searchTerm && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onSearch("")}
          aria-label="Clear search"
        >
          <FiX size={17} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;