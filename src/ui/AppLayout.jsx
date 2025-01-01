import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import "../index.css";

function AppLayout() {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === "loading";

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        {/* Outlet是一个占位符,使用Outlet来渲染子路由 */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
