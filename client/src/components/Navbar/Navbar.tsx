import { GoSignOut } from "react-icons/go";
import { Outlet, Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const Navbar = () => {
  const user = useAppSelector((state) => state.userState.user);
  return (
    <>
      <nav className="fixed top-0 w-screen flex justify-between items-center bg-slate-500 px-5 py-2">
        <div className="text-2xl font-bold text-slate-200 cursor-pointer">
          TodoWeb
        </div>
        <div className="flex gap-2 items-center cursor-pointer">
          <h3 className="text-xl font-bold text-slate-200 ">
            {user?.email.toString().split("@")[0]}
          </h3>
          <img
            className="w-10 bg-slate-200 rounded-full p-1"
            src={user?.avatar}
            alt="avatar"
          />
          <Link to="/login">
            <button className="flex justify-center items-center w-10 h-10 text-2xl text-center bg-slate-200 rounded-full">
              <GoSignOut />
            </button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
