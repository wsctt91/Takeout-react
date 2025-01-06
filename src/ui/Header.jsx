import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-around border-b border-stone-500 bg-yellow-500 px-4 py-4 uppercase sm:px-6">
      <Link to="/" className="font-sans font-semibold tracking-widest">
        思成披萨 PIZZA Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
