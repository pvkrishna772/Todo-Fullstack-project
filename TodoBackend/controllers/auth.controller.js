import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message:"all fields required"});

        }

        const [existing] = await pool.query(
            "select id from users where email = ?",
            [email]
        );
        if(existing.length>0){
            return res.status(409).json({message:"user already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        await pool.query("insert into users(email,password) values(?,?)",[email,hashedPassword]);
        res.status(201).json({message:"user registered successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"server error"});
    }

};
export const login = async(req,res)=>{
    try{
        const{email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({message:"all fields required"});
        }
        const [rows]=await pool.query("SELECT * FROM users where email = ?",[email]);

        if(rows.length===0){
            return res.status(401).json({message:"invalid credentials"});
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            });
        }
        const accessToken = jwt.sign(
            {
                id:user.id,email:user.email
            },process.env.ACCESS_SECRET,
            {expiresIn:"1500s"}
        );
        const refreshToken = jwt.sign({id:user.id,email:user.email},
                                    process.env.REFRESH_SECRET,
                                    {expiresIn: "10d"}
                                    );
        res.cookie("refreshToken",refreshToken,{httpOnly:true,
                    secure:false,
                    sameSite:"lax",
                    maxAge:10*24*60*60*1000
                   });
        res.json({accessToken});



        }catch(err){
            console.error(err);
            res.status(500).json({message:"server error"});
        }

    };


    export const logout = (req,res) => {

        
        res.clearCookie("refreshToken",{httpOnly:true,sameSite:"lax",secure:false});
        res.json({message:"logged out sucessfully"});
    };