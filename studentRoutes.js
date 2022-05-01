import express from "express";
import {detailsFind,detailsUpdate} from "./actions/dashboardActions.js";
import { adminAuth } from "./middleware/auth.js";

const router=express.Router();

router.route('/getstudentInfo/:name')
      .get(adminAuth,async(req,res)=>{
          const {name}=req.params;
          try{
              const info=await detailsFind(name);
              res.send(info);
          }
          catch(err){
              res.status(404).send(err);

          }
      });
router.route('/editStudentInfo/:id')
.put(adminAuth,async (request,response)=>{
    const {id}=request.params;
    let data=request.body;
    const result=await detailsUpdate({_id:ObjectID(id)}, data);
    response.send(result);
  })
export const studentRouter=router;