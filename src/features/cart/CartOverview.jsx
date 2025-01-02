import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="sm:px-6 md:text-base flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200">
      <p className="sm:space-x-6 space-x-4 font-semibold text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
