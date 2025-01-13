// Test ID: IIDSAT
import OrderItem from "./OrderItem";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

// 订单页面
function Order() {
  const order = useLoaderData(); // 22-009 使用loader函数用来加载数据. 数据的获取逻辑集中在路由组件中
  // 使用useFetcher HOOKS来获取数据
  const fetcher = useFetcher();

  // 使用useEffect来加载数据，从菜单router中获取数据
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );
  // console.log(fetcher.data);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">您的订单编号 # {id}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-red-50">
              优先配送
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-green-50">
            {status} 订单
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-5 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `还剩 ${calcMinutesLeft(estimatedDelivery)} 分钟订单送达... 🛵😃`
            : "订单已经到达"}
        </p>
        <p className="tex-stone-500 text-xs">
          (预计送达时间: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-5 py-5">
        <p className="text-sm font-medium text-stone-600">
          披萨总价: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            优先送货价: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          订单送货总价: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}
// loader加载页面
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
