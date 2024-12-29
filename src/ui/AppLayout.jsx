import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        {/* Outlet是一个占位符 */}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
