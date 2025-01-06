import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "../ui/Button";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-12 px-4 text-center sm:my-16">
      <h1 className="my-4 mb-8 text-center text-xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          新鲜配料，匠心烘焙，为你呈现真正的意大利风味！
        </span>
      </h1>
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          继续下单 - {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
