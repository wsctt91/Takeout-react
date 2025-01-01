import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

// Menu component
function Menu() {
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// 22-007 使用loader函数用来加载数据
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
