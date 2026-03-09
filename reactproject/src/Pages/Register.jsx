import {useState} from "react";
import api from "../api/api.js";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

function Register(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate =useNavigate();

    const handleRegister = async(e)=>{
        e.preventDefault();

        try{
            await api.post("auth/register",{email,password});

            console.log("Registered sucessfully! Please login.");

            navigate("/");


        }catch(err){
            console.log("registration failed");
            console.log(err);

        }
    };

    return(
        <div>
            <h2>Sign up!</h2>
        <form  onSubmit = {handleRegister}>
            < input type = "email" placeholder = "Enter email" value = {email} onChange ={(e)=>setEmail(e.target.value)} />

           <input type ="password" placeholder = "Enter password" value = {password} onChange ={(e)=>setPassword(e.target.value)} />

           <button type = "submit">Register</button>
        </form>  
         <p>Already have an account?
        <Link to ="/" >Sign in</Link>
</p>
        </div>         
    );
}

export default Register;