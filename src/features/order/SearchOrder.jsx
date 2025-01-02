import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handlerSubmit(e) {
    e.preventDefault();
    if (!query) {
      return;
    }
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handlerSubmit}>
      <input
        placeholder="Search order..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="sm:w-64 w-44 duration-400 cursor-text rounded-3xl bg-yellow-100 px-4 py-2 text-sm transition-all placeholder:text-stone-400 focus:w-72 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
      />
    </form>
  );
}

export default SearchOrder;
