import OTPInputField from "../../components/Auth/OTPInputField.tsx/OTPInputField";

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
        <button className="mt-5 px-5 py-2 rounded-md font-bold text-xl text-slate-500 bg-slate-300">
          Verify
        </button>
        <span className="text-sm text-slate-300 mt-2">
          Didn't get otp?
          <a>
            <b className="ml-2 uppercase">Resend OTP</b>
          </a>
        </span>
        <span className="font-bold text-sm text-slate-300 my-2">OR</span>
        <span className="text-sm text-slate-300">
          Go to
          <a>
            <b className="ml-2 uppercase">Login Page</b>
          </a>
        </span>
      </div>
    </>
  );
};

export default VerifyOTP;
