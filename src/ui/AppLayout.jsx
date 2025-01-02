import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
// import "../index.css";

function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-flow-row-dense">
      {/* Loading页面 */}
      {isLoading && <Loader />}

      {/* 标题栏 */}
      <Header />

      {/* MainContainer 主要内容 */}
      <div className="my-10 overflow-scroll">
        <main className="mx-auto max-w-3xl">
          {/* Outlet是一个占位符,使用Outlet来渲染子路由 */}
          <Outlet />
        </main>
      </div>

      {/* 购物车概览 */}
      <CartOverview />
    </div>
  );
}

export default AppLayout;
