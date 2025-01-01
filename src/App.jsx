import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Error from "./ui/Error.jsx";
import Menu, { loader as menuLoader } from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder.jsx";
import Order, { loader as orderLoader } from "./features/order/Order.jsx";
import AppLayout from "./ui/AppLayout.jsx";

// 使用的是React-Router-V6的新API
// 命令式的方式在JSX之外创建路由
const router = createBrowserRouter([
  {
    // AppLayout是一个布局路由组件，它包含了Header、Outlet和CartOverview
    // *组件获取数据的逻辑集中在路由组件中
    element: <AppLayout />,
    // 404页面
    errorElement: <Error />,
    // 子路由 -> 使用Outlet来渲染子路由
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader, // 22-007 使用loader函数用来加载数据. 数据的获取逻辑集中在路由组件中
        errorElement: <Error />, // 22-009 使用errorElement来处理加载数据失败的情
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId", // 这里的:orderId表示一个参数
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
