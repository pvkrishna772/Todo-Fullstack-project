import jwt from "jsonwebtoken";
import express from "express";


const router = express.Router();


router.post("/refresh",(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message:"Refresh token is missing"});
    }
    try{const decoded = jwt.verify(
        refreshToken,process.env.REFRESH_SECRET
    );
    const newAccessToken = jwt.sign({id:decoded.id,email:decoded.email},process.env.ACCESS_SECRET,{expiresIn:"15m"});
       return res.json({accessToken: newAccessToken});
    }catch(err){
        return res.status(403).json({message:"invalid or expired refresh token"});

    }
});

export default router;