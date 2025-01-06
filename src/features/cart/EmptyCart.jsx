import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 font-semibold">
        {/* Your cart is still empty. Start adding some pizzas :) */}
        您的购物车还是空的。开始添加一些披萨吧 🧑🏻‍🍳
      </p>
    </div>
  );
}

export default EmptyCart;
