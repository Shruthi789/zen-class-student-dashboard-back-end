import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { client } from '../index.js';

async function genPassword(password)
{
  const salt=await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword=await bcrypt.hash(password,salt);
  console.log(hashedPassword);
  return hashedPassword;
}

async function comparePassword(password,storedPassword)
{
  const result=await bcrypt.compare(password,storedPassword);
  console.log(result);
  return result;
}

function addUser(user){
    return client.db('studentDB').collection('users').insertOne(user);
}

function getUsers(){
    return client.db('studentDB').collection('users').find().toArray();
}

function updateUsers(id,data){
    return client.db('studentDB').collection('users').updateOne({_id:ObjectId(id)},{$set:data});
}

function getUser(filter){
    const {username,email}=filter;
    if(email){
    return client.db('studentDB').collection('users').findOne({email});
    }
    return client.db('studentDB').collection('users').findOne({username});
}

function passwordStrength(password){
    const regexp=new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})','g');
    const condition=regexp.test(password);
    if(condition)
    {
        return 'Password Strong!!'
    }
    return 'Password weak!!'
}
function emailValidation(email){
    const regexp=new RegExp('(.+)@(.+)$');
    const condition=regexp.test(email);
    if(condition){
        return 'Email valid!!'
    }
    return 'Email invalid!!'
}
export {genPassword,addUser,getUsers,updateUsers,passwordStrength,getUser,comparePassword,emailValidation}
