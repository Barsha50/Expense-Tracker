import { BrowserRouter, Route, Routes } from "react-router-dom";
import Expense from "./Expense";
import AddCategory from "./components/AddCategory";
import AddExpense from "./components/AddExpense";
import Category from "./Category";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
       <div style={{width:"100%"}}>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category/>}/>
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/addcategory/:id" element={<AddCategory />} />
          <Route path="/addexpense/:id" element={<AddExpense />} />
          <Route path="/addexpense" element={<AddExpense />} />
        </Routes>
         </div>
    </BrowserRouter>
  );
}

export default App;
