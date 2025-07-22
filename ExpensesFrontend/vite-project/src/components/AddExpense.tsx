import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { Formik, ErrorMessage, type FormikProps } from "formik";
import * as Yup from "yup";
import Sidebar from "./SidePanel";
import Navbar from "./Navbar";
interface IdName {
  id?: string;
  name: string;
}

interface ExpenseformValue {
  title: string;
  amount: number;
  notes: string;
  location: string;
  categoryId: IdName | null;
  date: string;
  payment: string;
}

const AddExpense = () => {
  const navigate = useNavigate();
  const [categoryOptions, setCategoryOptions] = useState<any[]>([]);
  const { id } = useParams();
  const formRef = useRef<FormikProps<any>>(null);
 
  const initialValues: ExpenseformValue = {
    title: "",
    amount: 0,
    categoryId: null,
    payment: "",
    notes: "",
    location: "",
    date: dayjs().format("YYYY-MM-DD"),
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(2).required("Please enter title"),
    amount: Yup.number()
      .positive("Amount must be in integers")
      .typeError("Enter a positive amount")
      .integer()
      .required("Please enter amount"),
    payment: Yup.string().required("Please enter payment mode"),
    categoryId: Yup.object().shape({
      id: Yup.string().required("Please enter a category"),
      name: Yup.string().required(),
    }),
    date: Yup.string().required("Please enter date"),
  });

  useEffect(() => {
    debugger;
    axios.get("https://localhost:44382/api/Categories").then((res) => {
      if (res.data) {
        setCategoryOptions(res.data);
      }
    });
  }, []);

  useEffect(() => {debugger
    if (id) {
      axios.get(`https://localhost:44382/api/Expense/${id}`).then((res) => {
        const data = res.data;
        formRef.current?.setValues({
          id: data.id,
          title: data.title,
          amount: data.amount,
          notes: data.notes,
          location: data.location,
          payment: data.payment,
          categoryId: data.categoryId,
          date: dayjs(data.date).format("YYYY-MM-DD"),
        } as ExpenseformValue);
      });
    }
  }, [id]);

  return (
    <div className="flex" style={{ width: "100%" }}>
      <div style={{ width: "10%", zIndex: 100 }}>
        <Sidebar />
      </div>
      <div className="grow h-full text-black" style={{ width: "90%" }}>
        <Navbar />
        <h1 className="text-xl text-center p-3 font-semibold border border-gray-100">
          Add Expenses
        </h1>
        <div className="text-black  ml-12 justify-items-centre border-gray-100 border mb-5">
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              try {
              
                  if (id) {
                  axios
                    .put(`https://localhost:44382/api/Expense/${id}`, values)
                    .then((res) => {
                      if (res) alert("Expense updated successfully");
                      navigate(-1);
                    });
                } else {
                  axios
                    .post("https://localhost:44382/api/Expense", values)
                    .then((res) => {
                      if (res) alert("Expense added successfully");
                      navigate(-1);
                    });
                
                } 
              } catch (error) {
                alert("error");
              }
            }}
          >
            {({ values, setValues, handleSubmit, handleBlur }) => (
              <form
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                className=" mt-8 align-middle grid grid-cols-2 content-start gap-8 text-[15.5px] ml-35"
              >
                <label>
                  Title:
                  <input
                    name="title"
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                    type="text"
                    value={values.title}
                    onChange={(event: any) => {
                      setValues({ ...values, title: event.target.value });
                    }}
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="title">
                    {(msg) => (
                      <div
                        style={{ color: "red" }}
                        className=" font-semibold text-[14px] ml-16"
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <label>
                  Amount:
                  <input
                    name="amount"
                    type="number"
                    value={values.amount}
                    onChange={(event: any) => {
                      setValues({ ...values, amount: event.target.value });
                    }}
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                    placeholder="Enter your amount"
                  />
                  <ErrorMessage name="amount">
                    {(msg) => (
                      <div
                        style={{ color: "red" }}
                        className="font-semibold text-[14px] ml-18"
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <label>
                  Categories:
                  <select
                    name="categoryId"
                    value={values.categoryId?.id}
                    onChange={(event: any) => {
                      debugger;
                      var option = categoryOptions.find(
                        (op) => op.id == event.target.value
                      );
                      setValues({
                        ...values,
                        categoryId: { id: option.id, name: option.name },
                      });
                    }}
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                  >
                    <option value="" hidden>
                      Select category
                    </option>
                    {categoryOptions.map((c) => {
                      return (
                        <>
                          <option value={c.id}>{c.name}</option>
                        </>
                      );
                    })}
                  </select>
                  <ErrorMessage name="categoryId">
                    {() => (
                      <div
                        style={{ color: "red" }}
                        className=" font-semibold text-[14px] ml-12"
                      >
                        {"Choosing a category is mandatory"}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <label>
                  Date:
                  <input
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={(event: any) => {
                      setValues({ ...values, date: event.target.value });
                    }}
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                  />
                  <ErrorMessage name="date">
                    {(msg) => (
                      <div
                        style={{ color: "red" }}
                        className="ml-16 font-semibold text-[14px]"
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <label>
                  Notes:
                  <input
                    name="notes"
                    type="text"
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                    value={values.notes}
                    onChange={(event: any) => {
                      setValues({ ...values, notes: event.target.value });
                    }}
                  />
                </label>
                <label>
                  Payment Method:
                  <select
                    name="payment"
                    id="payment"
                    value={values.payment}
                    onChange={(event) => {
                      setValues({ ...values, payment: event.target.value });
                    }}
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                  >
                    <option value="" disabled hidden>
                      Choose mode
                    </option>
                    <option value="Net Banking">Net Banking</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                  </select>
                  <ErrorMessage name="payment">
                    {(msg) => (
                      <div
                        style={{ color: "red" }}
                        className=" font-semibold text-[14px] ml-28"
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <label>
                  Location:
                  <input
                    name="location"
                    type="textarea"
                    value={values.location}
                    onChange={(event: any) => {
                      setValues({ ...values, location: event.target.value });
                    }}
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                  />
                </label>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="border-2 mt-5 rounded-lg  ml-28 px-4 py-3  text-sm text-center bg-blue-600 text-white font-semibold "
                  >
                    Submit
                  </button>
                  <button 
                  type="button"
                    onClick={() => navigate("/expense")}
                    className="border-2 rounded-lg ml-5 px-4 py-3 text-sm text-center bg-gray-500 text-white font-semibold "
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default AddExpense;
