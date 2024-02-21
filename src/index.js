// require('dotenv').config({path:'../env'})
import dotenv from "dotenv"
import express from "express";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path:'./.env'
})

connectDB()
.then(()=>{
  app.on("error",(err)=>{
    console.log(`error in connecting app to db ${err}`)
  })

  // console.log(`Current directory: ${process.cwd()}`);


  app.listen(process.env.PORT || 7600 , ()=>{
    console.log(`Server is listening at port : ${process.env.PORT || 7600 }`);
  })
})
.catch((err)=>{
  console.log(`mongodb connection failed ${err}`)
})






/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error",(error)=>{
        console.log('error in connecting app to db',error)
        throw err 
    })

    app.listen(process.env.PORT,()=>{
        console.log(`app is listeaning on ${process.env.PORT}`);
    })
  } catch (error) {
    console.error("ERROR :", error);
    throw err;
  }
})();
*/
