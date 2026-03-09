import{useState} from "react";
import { Link } from "react-router-dom";
import api from "../api/api.js";
import {useNavigate} from "react-router-dom";

function Login(){
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();
    

    const handleLogin = async(e)=>{
        e.preventDefault();

        try{
            const res = await api.post("auth/login",{email,password});

            const accessToken = res.data.accessToken;
            localStorage.setItem("accessToken",accessToken);

            console.log("login successful!");

            navigate("/todos");

        }catch(err){
            if(err.response?.status===401){
                navigate("/register");
            };
            console.log("login failed");
            console.log(err);
           
        }
    };

    return(
        <div>
            <h2>login!</h2>
            <form  onSubmit ={handleLogin}>
                <div>
                <input type ="email" placeholder = "enter email" value = {email} onChange = {(e)=>setEmail(e.target.value)} />
              </div>

            <div>
                <input type ="password" placeholder = "enter password" value = {password} onChange = {(e)=>setPassword(e.target.value)} />
             </div>
              <div>
                <button type = "submit">login</button>
                </div>

               
            </form>

             <p>
        Don't have an account? 
        <Link to="/register"> Sign up</Link>
      </p>

        </div>
    );
}

export default Login;