import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef } from "react";
import { Formik, ErrorMessage, type FormikProps } from "formik";
import * as Yup from "yup";
import Sidebar from "./SidePanel";
import Navbar from "./Navbar";

interface CategoryformValue {
  name: string;
  budgetLimit: number;
  type: string;
}

const AddCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef<FormikProps<any>>(null);
  // const [category, setCategory] = useState<{
  //   id?: any;
  //   name: string;
  //   budgetLimit: any;
  //   type: string;
  // }>({ name: " ", budgetLimit: null, type: " " });

  const initialValues: CategoryformValue = {
    name: "",
    budgetLimit: 0,
    type: "",
  };

  useEffect(() => {
    if (id) {
      axios.get(`https://localhost:44382/api/Categories/${id}`).then((val) => {
        const data = val.data;
        formRef.current?.setValues({
          id: data.id,
          name: data.name,
          budgetLimit: data.budgetLimit,
          type: data.type,
        });
      });
    }
  }, [id]);

  // async function save(event: any)
  // const handleSubmit = async (values: CategoryformValue) => {
  //   try {
  //     if (id) {
  //       await axios
  //         .put(`https://localhost:7233/api/Categories/${id}`, values)
  //         .then((val) => {
  //           if (val) alert("Category updated sucessfully");
  //           navigate(-1);
  //         });
  //     } else {
  //       await axios
  //         .post("https://localhost:7233/api/Categories", values)
  //         .then((val) => {
  //           if (val) alert("Category added sucessfully");
  //           navigate(-1);
  //         });
  //     }
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2).required("Please enter full name"),
    budgetLimit: Yup.number()
      .positive("Amount must be in integers")
      .typeError("Enter a positive amount")
      .integer()
      .required("Please enter budget"),
    type: Yup.string().required("Select payment mode"),
  });

  return (
    <div className="flex" style={{ width: "100%" }}>
      <div style={{ width: "10%", zIndex: 100 }}>
        <Sidebar />
      </div>
      <div className="grow h-full text-black" style={{ width: "90%" }}>
        <Navbar />
        <h1 className="text-xl text-center p-3 font-semibold border border-gray-100">
          Add Categories
        </h1>
        <div className="text-black  ml-12 justify-items-centre border-gray-100 border mb-5">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            innerRef={formRef}
            onSubmit={(values) => {
              try {
                if (id) {
                  axios
                    .put(`https://localhost:44382/api/Categories/${id}`, values)
                    .then((val) => {
                      if (val) alert("Category updated sucessfully");
                      navigate(-1);
                    });
                } else {
                  axios
                    .post("https://localhost:44382/api/Categories", values)
                    .then((val) => {
                      if (val) alert("Category added sucessfully");
                      navigate(-1);
                    });
                }
              } catch (err) {
                alert(err);
              }
            }}
          >
            {({ values, setValues, handleSubmit, handleBlur }) => (
              <form
                onBlur={handleBlur}
                onSubmit={handleSubmit}
                className="mt-8 align-middle grid grid-cols-2 gap-10 text-[16px] ml-35 "
              >
                <label>
                  Name:
                  <input
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                    name="name"
                    type="text"
                    value={values.name}
                    placeholder="Enter your name"
                    onChange={(event: any) => {
                      setValues({ ...values, name: event.target.value });
                    }}
                  />
                  <ErrorMessage name="name">
                    {(msg) => (
                      <div
                        style={{ color: "red" }}
                        className="ml-12.5 font-semibold text-[14px]"
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <label>
                  Budget Limit:
                  <input
                    name="budgetLimit"
                    type="text"
                    value={values.budgetLimit}
                    onChange={(event: any) => {
                      setValues({ ...values, budgetLimit: event.target.value });
                    }}
                    placeholder="Enter a budget"
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                  />
                  <ErrorMessage name="budgetLimit">
                    {(msg) => (
                      <div
                        style={{ color: "red" }}
                        className="ml-24 font-semibold text-[14px]"
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <label>
                  Type:
                  <select
                    name="type"
                    value={values.type}
                    onChange={(event: any) => {
                      setValues({ ...values, type: event.target.value });
                    }}
                    className="p-2 text-center border rounded-sm  ml-2 w-40"
                  >
                    <option value="" hidden>
                      Select Type
                    </option>
                    <option value="Fixed">Fixed</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                  <ErrorMessage name="type">
                    {(msg) => (
                      <div
                        style={{ color: "red" }}
                        className="ml-12.5 font-semibold text-[14px]"
                      >
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </label>
                <div className="mb-5">
                  <button
                    type="submit"
                    className="border-2 mt-10 rounded-lg  ml-28 px-4 py-3  text-sm text-center bg-blue-600 text-white font-semibold"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/category")}
                    className="border-2 rounded-lg ml-5 px-4 py-3 text-sm text-center bg-gray-500 text-white font-semibold  "
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
export default AddCategory;
