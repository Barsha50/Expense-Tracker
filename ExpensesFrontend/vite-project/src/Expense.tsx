import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SidePanel";

function Expense() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    Loading();
  }, [reload]);

  const Loading = async () => {
    debugger;
    await axios.get("https://localhost:44382/api/Expense").then((res) => {
      if (res.data) setExpenses(res.data);
    });
  };

  async function Delete(id: string) {
    await axios.delete(`https://localhost:44382/api/Expense/${id}`);
    alert("Deleted successfully");
    setReload(true);
  }
  return (
    <div className="flex" style={{ width: "100%" }}>
      <div style={{ width: "10%", zIndex: 100 }}>
        <Sidebar />
      </div>
      <div className="grow h-full text-black" style={{ width: "90%" }}>
        <Navbar />
        <div className="mt-4">
          <button
            onClick={() => navigate("/addexpense")}
            className="font-thin text-[15px] md:ml-18 px-2 py-3 bg-blue-500 text-white rounded-lg border text-center"
          >
            <i className="text-[12px] fa-solid fa-plus"></i> Add Expense
          </button>
        </div>
        <div className=" p-8 ml-8 text-[16px] uppercase font-thin relative overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-b border-gray-100">
            <thead className=" text-gray-700 text-middle ml-10 p-4 font-thin bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                 Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Notes
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {expenses?.map((exp) => {
                return (
                  <>
                    <tr className="">
                      <th scope="row" className="px-6 py-4 ">
                        {exp.title}
                      </th>
                      <td className="px-6 py-4">{exp.amount}</td>
                      <td className="px-6 py-4">
                        {dayjs(exp.date).format("DD-MM-YYYY")}
                      </td>
                       <td className="px-6 py-4">
                        {exp.categoryId.name}
                      </td>
                      <td className="px-6 py-4">{exp.notes}</td>
                      <td className="px-6 py-4">{exp.payment}</td>
                      <td className="px-6 py-4">{exp.location}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            navigate(`/addexpense/${exp.id}`);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onClick={() => {
                            Delete(exp.id);
                          }}
                          className="ml-4"
                        >
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

export default Expense;
