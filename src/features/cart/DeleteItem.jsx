import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import PropTypes from "prop-types";

// 订单中的每个商品都有一个删除按钮
function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      删除
    </Button>
  );
}

DeleteItem.propTypes = {
  pizzaId: PropTypes.string.isRequired,
};

export default DeleteItem;
