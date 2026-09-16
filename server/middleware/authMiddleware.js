import jwt from 'jsonwebtoken'
export const auth=( req,res,next)=>{
try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message:"Authentication required"
        })
    }
     const token= authHeader.split(" ")[1];
     if (!token) {
      return res.status(401).json({
        message: "Token missing or malformed",
      });
    }
     const decode= jwt.verify(token, process.env.JWT_SECRET);
     req.user = decode;
     next()   
} catch (error) {
    console.log("Authentication failed",error.message);
    return res.status(401).json({
        message:"Invalid or expired token"
    })
}
}