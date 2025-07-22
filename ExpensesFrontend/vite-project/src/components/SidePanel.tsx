import { useNavigate } from "react-router-dom";
import logo from "../assets/logo .png"

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-60 h-full fixed border-r border-e-gray-100 bg-white text-[15px]">
      <div>
        <img src={logo} className="w-40  ml-10 mt-2"/>
      </div>
       <div className="flex items-center flex-row mb-2.5 ml-5 text-blue-500">
        <i className="fa-solid fa-igloo"></i>
        <button
          onClick={() => navigate("/expense")}
          className="ml-3  text-black hover:text-yellow-800 ..."
        >
         Dashboard
        </button>
      </div>
      <div className="border-b border-gray-200"></div>
       <div className="flex items-center flex-row mt-5 ml-4 text-blue-500">
        <i className="text-[16px] fa-solid fa-money-bill-trend-up"></i>
        <button
          onClick={() => navigate("/expense")}
          className="ml-4 text-black hover:text-blue-900 ..."
        >
          Expenses
        </button>
      </div>
      <div className="flex items-center flex-row mt-6 ml-4 text-blue-500">
        <i className="text-[16px] fa-solid fa-layer-group"></i>
        <button
          onClick={() => navigate("/category")}
          className=" ml-3 text-black  hover:text-blue-900 ..."
        >
          Category
        </button>
      </div>
     
    </div>
  );
};

export default Sidebar;
