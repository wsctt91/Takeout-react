import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

//  添加一个UpdateOrder组件，用来更新订单
function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="small">优先订单</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

//  !24-014 React Router知道如何处理这个action函数，因为我们在路由中指定了action: updateOrderAction\
//  !它会自动在后台加载数据，然后调用这个action函数
export async function action({ params }) {
  //   console.log("update");
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
