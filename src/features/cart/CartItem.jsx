import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="sm:flex sm:items-center sm:justify-between py-3">
      <p className="sm:mb-0 mb-1">
        {quantity}&times; {name}s
      </p>
      <div className="sm:gap-6 flex items-center justify-between">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <Button type="small">Delete</Button>
      </div>
    </li>
  );
}

export default CartItem;
