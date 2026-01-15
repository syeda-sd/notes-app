import { FaSearch } from "react-icons/fa";

function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
