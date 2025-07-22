import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/SidePanel";
import Navbar from "./components/Navbar";

function Category() {
  const navigate = useNavigate();
  const [values, setValues] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    Load();
  }, [refresh]);

  const Load = async () => {
    debugger;
    await axios.get("https://localhost:44382/api/Categories").then((res) => {
      if (res.data) setValues(res.data);
    });
  };
  
   async function Delete(id:string){debugger
      await axios.delete(`https://localhost:44382/api/Categories/${id}`);
      alert("Category deleted successfullly");
      setRefresh(true)
   }

  return (
     <div className="flex" style={{ width: "100%" }}>
      <div style={{ width: "10%", zIndex: 100 }}>
        <Sidebar/>
      </div>
      <div className="grow h-full text-black" style={{ width: "90%" }}>
        <Navbar />
      <div className="mt-4">
        <button
          onClick={() => navigate("/addcategory")}
          className="font-thin text-[15px] ml-18 px-2 py-3 bg-blue-500 text-white rounded-lg border text-center"
        >
          <i className="text-[12px] fa-solid fa-plus"></i> Add Category
        </button>
      </div>
      <div className="p-8 ml-8 text-[16px] uppercase font-thin relative overflow-x-auto">
        <table className="w-full text-left rtl:text-right table-auto border-b border-gray-100">
          <thead className=" text-gray-700 text-middle ml-10 p-4 font-thin bg-gray-100 ">
            <tr className="">
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Budget
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {values?.map((val) => {
              return (
                <>
                  <tr className="">
                    <th scope="row" className="px-6 py-4 ">
                      {val.name}
                    </th>
                    <td className="px-6 py-4">{val.budgetLimit}</td>
                    <td className="px-6 py-4">{val.type}</td>
                    <td className="px-6 py-4">
                      <button onClick={() =>{ navigate(`/addcategory/${val.id}`);}}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button onClick={()=>Delete(val.id)} className="ml-5">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Category;
