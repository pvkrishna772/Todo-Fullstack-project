import api from "../api/api.js";
import {useNavigate} from "react-router-dom";

export default function LogoutButton(){
const navigate = useNavigate();

 const handleLogout = async() =>{
    
    try{
    await api.post("/auth/logout");

    localStorage.removeItem("accessToken");

    navigate("/");

    }catch(err){
        console.log(err);
    }
 };
    return(
        <>
        <button onClick = {handleLogout}>Logout</button>
        </>
    );



};
