import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import formlogo from "../assets/formlogo.png"

const initialValues = {
  name: "",
  email: "",
  contact: "",
  password: "",
  confirmpassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Please enter correct email"),
  password: Yup.string().min(4).required("Please enter password"),
  confirmpassword: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password")], "Password not matched"),
});

const Register = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        try{
          var res = await axios.post(`https://localhost:44382/api/User/login?email=${values.email}&password=${values.password}`);
        console.log(res.data);
        sessionStorage.setItem("JWTToken",res.data.accessToken)
        navigate("/expense");
        alert("Logged in successfully")
        }catch(e){
            alert("Invalid user credentials")
        }
      },
    });
  return (
    <div className="flex ">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-50  mt-47 align-middle grid grid-rows-3 gap-6 h-auto text-[16px] ml-160 w-[480px] font-thin border-blue-600 rounded-lg shadow shadow-blue-200 p-4"
      >
        <div className="flex items-center gap-4 ml-33 mt-2">
          <img src={formlogo} className="w-49 h-auto mt-2"/>
        </div>

        <label className="ml-16">
         
          <input
            name="email"
            className="border-3 border-indigo-200 border-x-indigo-500 p-2 text-center text-blue-600  font-semibold rounded-3xl w-80 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none "
            type="text"
            placeholder="Enter your Email-ID"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && touched.email ? (
            <p className="text-red-400 font-semibold text-[12px]  ml-24 mt-1">
              {errors.email}
            </p>
          ) : null}
        </label>
        <label className="ml-16">
          <input
            name="password"
            className="border-3 border-indigo-200 border-x-indigo-500 p-2 text-center font-semibold text-blue-600 rounded-3xl w-80 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none"
            type="text"
            placeholder="Write your password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.password && touched.password ? (
            <p className="text-red-400 font-semibold text-[12px] ml-24 mt-1">
              {errors.password}
            </p>
          ) : null}
        </label>
        <label className="ml-16">
          <input
            name="confirmpassword"
            className="border-3 border-indigo-200 border-x-indigo-500 text-blue-600  p-2 text-center font-semibold rounded-3xl w-80 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none"
            type="text"
            placeholder="Confirm password"
            value={values.confirmpassword}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.confirmpassword && touched.confirmpassword ? (
            <p className="text-red-400 font-semibold text-[12px] ml-24 mt-1">
              {errors.confirmpassword}
            </p>
          ) : null}
        </label>
        <div className="">
          <button
          type="submit"
            // onClick={() => navigate("/expense")}
            className="border-2 rounded-2xl  ml-40 px-11 py-3  text-[17px] font-sans text-center bg-blue-500 text-white hover:bg-blue-500"
          >
            Sign In
          </button>
        </div>
        <p className="ml-30 font-thin text-[16px]">
          {" "}
          Don't have an account ?
          <button
            onClick={() => navigate("/")}
            className="ml-2 text-[17px] text-center text-blue-500 "
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
