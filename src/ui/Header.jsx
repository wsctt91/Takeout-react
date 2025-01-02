import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="sm:px-6 flex items-center justify-around border-b border-stone-500 bg-yellow-500 px-4 py-4 uppercase">
      <Link to="/" className="font-sans font-semibold tracking-widest">
        Charles Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
