import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

// 底部购物车概览
function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // 如果购物车中没有商品，返回null
  if (!totalCartQuantity) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity}&nbsp;个披萨</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">打开购物车&rarr;</Link>
    </div>
  );
}

export default CartOverview;
