import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex justify-between bg-blue-500 text-white text-[17px] px-3 py-3">
        <div className="flex items-center ml-16 gap-2">
          <i className="fa-solid fa-bars text-white cursor-pointer"></i>
          <span className="text-white font-semibold">Expense Tracker</span>
        </div>
        <div className="flex items-center gap-x-6">
          <div>
            <button className="rounded-md py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none  hover:bg-slate-700">
              <i className="fa-solid fa-users-viewfinder text-[22px]"></i>
            </button>
            <ul className="absolute z-10  overflow-auto rounded-lg border border-slate-200 bg-white p-1  focus:outline-none">
              <button className="w-full" onClick={() => navigate("/expense")}>
                <li className=" cursor-pointer text-slate-800 flex w-full text-sm text-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                  Profile
                </li>
              </button>
              <button className="w-full" onClick={() => navigate("/login")}>
                <li className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                  Logout
                </li>
              </button>
            </ul>
          </div>

          <div className="relative w-60">
            <span className="relative md:absolute inset-y-0 left-0 flex items-center text-center">
              <button className="px-4 py-2 text-white text-[16px] text-center">
                <i className="fa-solid fa-magnifying-glass-location text-[14px] mr-2"></i>
                Search...
              </button>
            </span>
            <input
              type="text"
              className="w-40 rounded-lg pl-12 px-4 py-1 shadow-xl border-1 border-white hidden md:block"
            ></input>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
