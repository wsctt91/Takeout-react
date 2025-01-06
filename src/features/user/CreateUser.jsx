import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";

import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

// 创建新用户 -> 输入用户名区域
function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 欢迎来到我们的小店！该如何称呼您呢：
      </p>

      <input
        type="text"
        placeholder="请输入订单用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        // 复用的样式可以和其他地方的样式保持一致
        className="input mb-6 w-72"
      />

      {username !== "" && (
        <div>
          <Button type="primary">开始订单</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
