import PasswordInputField from "../../components/Auth/PasswordInputField/PasswordInputField";
import UsernameInputField from "../../components/Auth/UsernameInputField/UsernameInputField";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-500">
        <h3 className="text-3xl font-bold text-slate-300">TodoWeb</h3>
        <UsernameInputField />
        <PasswordInputField placeholder="Enter Password" />
        <div className="flex flex-col items-center gap-1">
          <Link to="/">
            <button className="w-72 mt-2 px-5 py-2 text-slate-500 font-bold bg-slate-300 rounded-md">
              Login
            </button>
          </Link>
          <span className="font-bold text-sm text-slate-300 my-2">OR</span>
          <div className="flex justify-center items-center w-72 mt-2 px-5 py-2 text-white font-bold bg-red-500 rounded-md">
            <span className="mr-2 text-xl">
              <AiOutlineGoogle />
            </span>
            <button>Continue with Google</button>
          </div>
        </div>

        <span className="text-sm text-slate-300 mt-2">
          Go to
          <Link to="/register">
            <b className="ml-2 uppercase">Register Page</b>
          </Link>
        </span>
      </div>
    </>
  );
};

export default Login;
