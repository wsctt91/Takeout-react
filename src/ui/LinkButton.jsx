import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// Tailwindcss复用的按钮组件
// 通过创建一个LinkButton组件，他可以用作一个普通的按钮或者一个链接
function LinkButton({ children, to }) {
  const navigate = useNavigate(); // 通过useNavigate来获取导航函数
  const className = "text-sm text-blue-500 hover:text-blue-700 hover:underline";

  if (to === "-1") {
    return (
      // 通过navigate(-1)来返回上一页
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default LinkButton;
