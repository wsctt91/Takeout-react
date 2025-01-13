import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

/* // 一个假的购物车数据
const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  // console.log(cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.25 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100">
      <div className="mt-16 w-full max-w-3xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          {/* Ready to order? Let&apos;s go! */}
          准备好下单了吗？让我们开始吧！
        </h2>

        {/* <Form method="POST" action="/api/order"> */}
        <Form method="POST" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="text-gray-700 sm:w-40">会员证</label>
            <input
              placeholder="请输入您的用户名"
              className="input grow"
              type="text"
              name="customer"
              defaultValue={username} // 默认值
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="text-gray-700 sm:w-40">联系电话</label>
            <div className="grow">
              <input
                placeholder="XXX-XXXX-XXXX"
                className="input mt-2 sm:mt-0 sm:flex-1"
                type="tel"
                name="phone"
                required
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 text-xs text-red-600">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          {/* 收货地址 */}
          <div className="relative flex flex-col sm:flex-row sm:items-center">
            <label className="text-gray-700 sm:w-40">收货地址</label>
            <div className="grow">
              <input
                placeholder="点击按钮获取地址"
                className="input mt-2 sm:mt-0 sm:flex-1"
                type="text"
                name="address"
                disabled={isLoadingAddress}
                defaultValue={address}
                required
              />
              {addressStatus === "error" && (
                <p className="mt-2 rounded-md bg-red-100 text-xs text-red-600">
                  {errorAddress}
                </p>
              )}
            </div>
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[4.5px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
                <Button
                  disabled={isLoadingAddress}
                  type="small"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  获取地址
                </Button>
              </span>
            )}
          </div>

          {/* 优先配送选择 */}
          <div className="mb-12 flex items-center gap-5">
            <input
              className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-1"
              type="checkbox"
              name="priority"
              id="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority" className="font-medium">
              {/* Want to give your order priority? */}
              想让您的订单优先配送吗？
            </label>
          </div>
          {/* 提交按钮 */}
          <div>
            <input type="hidden" name="cart" value={JSON.stringify(cart)} />
            <input
              type="hidden"
              name="position"
              value={
                position.longitude && position.latitude
                  ? `${position.latitude},${position.longitude}`
                  : ""
              }
            />
            <Button disabled={isSubmitting || isLoadingAddress} type="primary">
              {isSubmitting
                ? "Placing Order..."
                : `立即下单 ${formatCurrency(totalPrice)}`}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// action函数会在表单提交时调用
export async function action({ request }) {
  const formData = await request.formData(); // formData是一个对象，包含了表单中的所有数据
  const data = Object.fromEntries(formData); // fromEntries 方法把键值对列表转换为一个对象。
  // console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = "Please enter a valid phone number.";
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  // 如果没有问题，就创建一个新的订单，然后重定向到新订单的页面
  const newOrder = await createOrder(order);
  // 不要经常使用
  // store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);

  // return null;
}

export default CreateOrder;
