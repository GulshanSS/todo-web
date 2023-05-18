const Navbar = () => {
  return (
    <>
      <div className="fixed top-0 sm:bottom-0 w-screen flex justify-between items-center bg-slate-500 px-5 py-2">
        <div className="text-2xl font-bold text-slate-200 cursor-pointer">
          TodoWeb
        </div>
        <div className="flex gap-2 items-center cursor-pointer">
          <h3 className="text-xl font-bold text-slate-200 ">creaser</h3>
          <img
            className="w-10 bg-slate-200 rounded-full p-1"
            src="https://api.dicebear.com/6.x/bottts/svg?seed=Abby"
            alt="avatar"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
