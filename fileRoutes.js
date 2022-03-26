import express from "express";
import fs from 'fs';
import path from 'path';

const router= express.Router();

/*Creating a file in a particular folder by providing the full folder path */
router.route('/create-file')
       .post((request,response)=>{
           const {folderName}=request.body;
           const currentDateandTime=new Date();
           const timestamp=currentDateandTime.getTime();
           const fileName=`${currentDateandTime.getDate()}.${currentDateandTime.getMonth()+1}.${currentDateandTime.getFullYear()}-${currentDateandTime.getHours()}.${currentDateandTime.getMinutes()}.txt`;
           const folderPath=path.resolve(`${folderName}`);
           const filePath=path.join(`${folderPath}`,`${fileName}`);
           //Checking if the Folder exists and creating one if it does not exist
           fs.access(folderPath,(err)=>{
               if(err){
                   fs.mkdir(folderPath,(err)=>{
                       if(err){
                        response.status(404).send({msg:err});
                       }
                   })
               }
           });
           //Creating a file if the folder exists
           fs.appendFile(`${filePath}`,timestamp.toString(),function(err) {
            if(err) {
                response.status(404).send({msg:err});
            }
            else{
            response.send({msg:'File saved successfully'});
            }
        })
       });

/*Retrieving files from a particular folder by providing the full folder path */
router.route('/retrieve-files')
      .get((request,response)=>{
        const {folderName}=request.body;
        const folderPath=path.resolve(`${folderName}`);
        fs.readdir(folderPath,(err,files)=>{
            if(err){
                response.status(404).send({msg:err});
            }
            else{
                response.send(files.toString());
            }
        });
      });

export const fileRouter=router;