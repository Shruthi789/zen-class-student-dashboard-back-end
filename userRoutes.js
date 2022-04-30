import express from "express";
import jwt from "jsonwebtoken";
import {genPassword,addUser,passwordStrength,getUser,comparePassword,emailValidation, updateUsers} from './actions/userActions.js';
import { otpAdd,mailSend,otpFind,otpDelete} from "./actions/otpActions.js";

const router=express.Router();

router.route('/signup')
    .post(async (request,response)=>{
      const {username,password,email,usertype}=request.body;
      const user=await getUser({username});
      const passStrength=passwordStrength(password);
      const emailValid=emailValidation(email);
      if(user){
          response.status(400).send({msg:'Duplicate value!!'});
      }
      else if(passStrength==='Password weak!!'){
        response.status(400).send({msg:passStrength});
    }
    else if(emailValid==='Email invalid!!'){
      response.status(400).send({msg:emailValid});
    }
    else{
      const hashedPassword=await genPassword(password);
      const result=await addUser({username,password:hashedPassword,usertype,email});
      response.send({msg:"Success!!",result});
    }
  });

  router.route('/signin')
        .post(async (request,response)=>{
    const {username,password}=request.body;
    const user=await getUser({username});
    let token;
    if(!user){
      response.status(401).send('Invalid credentials');
      return;
    }
    const passValid=await comparePassword(password,user.password);
    if(!passValid){
      response.status(401).send('Invalid credentials');
      return;
    }
      token=jwt.sign({id:user._id},process.env.ADMIN_SECRET_KEY);
      response.send({msg:'Sign in successful',type:user.usertype,username,token});
    });
  
  router.route('/send-email')
        .post(async(request,response)=>{
          const {email}=request.body;
          const user=await getUser({email});
          if(user){
            let otpCode=Math.floor(Math.random()*1000+1);
            let expireIn=new Date().getTime()+(300*1000);
            const data={email,otpCode,expireIn};
            let otp=await otpAdd(data);
            mailSend(data);
            response.send({msg:'Success',result:otp});
          }
          else{
            response.status(404).send({msg:"Email not found"});
          }
        })
 router.route('/change-password')
       .post(async(request,response)=>{
         const {email,otpCode,password,confirmPassword}=request.body;
         if(password!==confirmPassword){
          response.status(400).send({msg:"Passwords not matching!"});
         }
         const otp=await otpFind({email,otpCode:(+otpCode)});
         if(otp){
           const currentTime=new Date().getTime();
           const diff=otp.expireIn-currentTime;
           if(diff<0){
             const action=await otpDelete(otp._id);
             response.status(400).send({msg:"OTP Expired! Please generate a new OTP",action});
           }
           else{
            const user=await getUser({email});
            const passStrength=passwordStrength(password);
            if(user && passStrength==="Password Strong!!"){
              const hashedPassword=await genPassword(password);
              const action=await updateUsers(user._id,{password:hashedPassword});
              await otpDelete(otp._id);
              response.send({msg:"Password changed!",action})
            }
            else if(passStrength==="Password weak!!"){
              response.status(400).send({msg:passStrength})
            }
           }
         }
         else{
           response.status(404).send({msg:"Invalid OTP"});
          }
         }
        );
 export const usersRouter=router;