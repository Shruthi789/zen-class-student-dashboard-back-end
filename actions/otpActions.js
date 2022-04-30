import { client } from '../index.js';
import nodemailer from "nodemailer";
import { ObjectId } from 'mongodb';

//Adding OTP Data
function otpAdd(data){
    return client.db('studentDB').collection('otp').insertOne(data);
}
//Find OTP Data 
function otpFind({email,otpCode}){
    return client.db('studentDB').collection('otp').findOne({email,otpCode});
}
//Find OTP Data 
function otpDelete({id}){
    return client.db('studentDB').collection('otp').deleteOne({_id:ObjectId(id)});
}

//Sending the mail
function mailSend({email,otpCode,expireIn}){
    let mailTransporter= nodemailer.createTransport({
        name: "smtp.gmail.com",
        host: "smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL_ID,
            pass:process.env.PASSWORD
        }
    });
    let details ={
        from:process.env.EMAIL_ID,
        to:`${email}`,
        subject:'OTP for Password reset',
        text:`Please enter the OTP ${otpCode} (expiring at ${expireIn}) to reset the password`
    };
    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Success!!");
        }
    })

}


export {otpAdd,mailSend,otpFind,otpDelete};