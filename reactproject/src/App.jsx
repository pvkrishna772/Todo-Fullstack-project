
import TodosPage from "./TodosPage";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";





export default function App() {
 
  

  return (
    <>
     <BrowserRouter>
  <Routes>
    

    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
     <Route
      path="/todos"
      element={<TodosPage />}
    />
  </Routes>
</BrowserRouter>
    </>
  );
}
