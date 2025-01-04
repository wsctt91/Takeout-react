import { useSelector } from "react-redux";

// 主页右上角的用户名
function Username() {
  const userName = useSelector((state) => state.user.username);

  if (!userName) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{userName}</div>
  );
}

export default Username;
