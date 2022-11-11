import jwt from "jsonwebtoken";
export const validateAccessToken = async (req, res, next) => {
  console.log(req);
  if (!req.headers.id) {
    res.status(400).send({ err: "please provide users.id" });
  } else {
    next();
  }
};


export const validateJwtToken= async(req,res,next)=>{
  if(token== null){
    res.status(401).send(token is not present)
  }
  if(token){
    res.status(400).send( token is exist)
 }
 
}