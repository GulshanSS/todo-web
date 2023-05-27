import OTPInputField from "../../components/Auth/OTPInputField.tsx/OTPInputField";
import { Link } from "react-router-dom";

const VerifyOTP = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-500">
        <div className="">
          <OTPInputField />
          <OTPInputField />
          <OTPInputField />
          <OTPInputField />
        </div>
        <span className="text-sm font-bold uppercase text-slate-300">
          Enter Verification OTP sent to your email
        </span>
        <Link to="/">
          <button className="mt-5 px-5 py-2 rounded-md font-bold text-xl text-slate-500 bg-slate-300">
            Verify
          </button>
        </Link>
        <span className="text-sm text-slate-300 mt-2">
          Didn't get otp?
          <a>
            <b className="ml-2 uppercase">Resend OTP</b>
          </a>
        </span>
        <span className="font-bold text-sm text-slate-300 my-2">OR</span>
        <span className="text-sm text-slate-300">
          Go to
          <Link to="/login">
            <b className="ml-2 uppercase">Login Page</b>
          </Link>
        </span>
      </div>
    </>
  );
};

export default VerifyOTP;
