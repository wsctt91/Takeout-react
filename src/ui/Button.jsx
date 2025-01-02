import { Link } from "react-router-dom";

// Tailwindcss复用的按钮组件
// 通过创建一个Button组件，他可以用作一个普通的按钮或者一个链接
function Button({ children, disabled, to, type }) {
  const base =
    "duration-400 inline-block cursor-pointer rounded-3xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-300 text-sm";

  const styles = {
    primary: base + "sm:px-6 sm:py-4 px-4 py-3",
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "duration-400 inline-block cursor-pointer rounded-3xl font-semibold uppercase tracking-wide text-stone-400 transition-colors hover:bg-stone-300 hover:text-stone-800  focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-gray-300 border-2 border-stone-300 sm:px-6 sm:py-3.5 px-4 py-2.5 focus:text-stone-800 focus:bg-stone-300 text-sm",
  };

  if (to) {
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  }

  return (
    <div disabled={disabled} className={styles[type]}>
      {children}
    </div>
  );
}

export default Button;
