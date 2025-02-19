import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";

import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

// 菜单页面的每个商品
function MenuItem({ pizza }) {
  const dispatch = useDispatch(); // useDispatch作用是获取dispatch函数、
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  // ?判断当前商品是否在购物车中
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  // console.log(currentQuantity);
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    // console.log(id);
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {/* 删除-Button */}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {/* 添加-Button */}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              加入购物车
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.object.isRequired,
};

export default MenuItem;
