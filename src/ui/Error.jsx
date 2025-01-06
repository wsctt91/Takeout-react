import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();
  // console.log(error);

  return (
    <div>
      <h1>未找到匹配的结果，请尝试其他关键词... 😢</h1>
      <p>{error.data || error.message}</p>
      {/* 返回上一页 */}
      <LinkButton to="-1">&larr; 返回上一页</LinkButton>
    </div>
  );
}

export default Error;
