import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import formlogo from "../assets/formlogo.png"

const initialValues={
  name : "",
  email : "",
  contact : "",
  password: "",
  confirmpassword:"",
}

const validationSchema = Yup.object().shape({
      name: Yup.string().min(4).required("Please enter title"),
      contact: Yup.number()
        .positive()
        .typeError("Enter correct number")
        .integer()
        .required("Please enter number"),
      email: Yup.string().required("Please enter email"),
      password: Yup.string().min(8).required("Please enter password"),
      confirmpassword: Yup.string().required("Please confirm password").oneOf([Yup.ref("password")],"Password not matched"),
    });

const Register = () => {
  const navigate = useNavigate();
  const {values,errors,touched, handleBlur,handleChange,handleSubmit , resetForm} = useFormik({
    initialValues:initialValues,
    validationSchema:validationSchema,
    onSubmit: async (values)=>{
      try{
        var res = await axios.post("https://localhost:44382/api/User/register" , values);
        console.log(res.data);
        resetForm();
        navigate("/login")
        alert("Registered successfully. Please login again to continue")
      }catch(e){
        console.error(e);
      }
    }
  })
  return (
    <div className="flex ">
      <form  onSubmit={handleSubmit} className=" bg-gray-50 mt-30 align-middle grid grid-rows-5 gap-6 h-auto text-[16px] ml-160 w-[505px] font-thin border-blue-600 rounded-lg shadow shadow-blue-200 p-4">
        <div className="flex items-center gap-4 ml-36 ">
          <img src={formlogo} className="w-49 h-auto mt-2"/>
        </div>
        <label className="ml-20">
          <input
            name="name"
            className="border-4 border-indigo-200 border-x-indigo-500 p-2 text-center text-blue-600  font-semibold rounded-3xl w-78 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none"
            type="text"
            placeholder="Enter name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        { errors.name && touched.name ? (<p className="text-red-400 font-semibold text-[11px] ml-24 mt-1 ">{errors.name}</p>):null} 
        </label>
        <label className="ml-20" >
          <input
            name="email"
            className="border-4 border-indigo-200 border-x-indigo-500 p-2 text-center text-blue-600  font-semibold rounded-3xl w-78 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none"
            type="text"
            placeholder="Enter  email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          { errors.email && touched.email ? (<p className="text-red-400 font-semibold text-[11px]  ml-24 mt-1" >{errors.email}</p>):null} 
        </label>
        <label className="ml-20">
          <input
            name="contact"
            className="border-4 border-indigo-200 border-x-indigo-500 p-2 text-center text-blue-600  font-semibold rounded-3xl w-78 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none"
            type="text"
            placeholder="Enter mobile number"
            value={values.contact}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          { errors.contact && touched.contact ? (<p className="text-red-400 font-semibold text-[11px] ml-24 mt-1">{errors.contact}</p>):null} 
        </label>
        <label className="ml-20">
          <input
            name="password"
            className="border-4 border-indigo-200 border-x-indigo-500 p-2 text-center text-blue-600  font-semibold rounded-3xl w-78 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none"
            type="text"
            placeholder="Create password"
            value= {values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          { errors.password && touched.password ? (<p className="text-red-400 font-semibold text-[11px] ml-24 mt-1">{errors.password}</p>):null} 
        </label>
        <label className="ml-20">
          <input
            name="confirmpassword"
            className="border-4 border-indigo-200 border-x-indigo-500 p-2 text-center text-blue-600  font-semibold rounded-3xl w-78 h-13 focus:outline-blue-500 active:border-blue-500 focus:shadow-none"
            type="text"
            placeholder="Confirm password"
            value={values.confirmpassword}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          { errors.confirmpassword && touched.confirmpassword ? (<p className="text-red-400 font-semibold text-[11px] ml-24 mt-1">{errors.confirmpassword}</p>):null} 
        </label>
         <div>
                  <button
                  type="submit"
                  // onClick={()=>navigate("/")}
                    className="border-2 rounded-2xl  ml-42 px-11 py-3  text-[16px] font-sans text-center bg-blue-500 text-white"
                  >
                    Sign Up
                  </button>
                </div>
                <p className="ml-32 font-thin text-[16px]">  Already have an account ?<button
                onClick={()=>navigate("/login")}
                    className="ml-2 text-[17px] text-center text-blue-500"
                  >
                    Sign In
                  </button></p>
      </form>

    </div>
  );
};

export default Register;
