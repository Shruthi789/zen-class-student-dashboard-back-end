import jwt from "jsonwebtoken";
function adminAuth(request,response,next){
    try{
    const token=request.header('x-auth-token');
    jwt.verify(token,process.env.ADMIN_SECRET_KEY);
    next();
    }catch(error){
      response.status(401).send(error.message);
    }

}

export {adminAuth};