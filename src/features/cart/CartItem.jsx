import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

// 购物车页面的每个商品
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  // ?判断当前商品是否在购物车中
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  // console.log(currentQuantity);

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 font-medium sm:mb-0">
        {quantity} &times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-base font-bold">{formatCurrency(totalPrice)}</p>
        {/* Button part */}
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
