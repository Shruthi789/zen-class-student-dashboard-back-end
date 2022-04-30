import express from "express";
import {detailsFind} from "./actions/dashboardActions";
import { adminAuth } from "./middleware/auth";

const router=express.Router();

router.route('/getstudentInfo')
      .get(adminAuth,async(req,res)=>{
          const data=req.body;
          try{
              const info=await detailsFind(data);
              res.send(info);
          }
          catch(err){
              res.status(404).send(err);

          }
      });

export const studentRouter=router;