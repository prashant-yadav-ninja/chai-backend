import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(cors({origin: process.env.CORS_ORIGIN,Credential: true,}));
app.use(express.json({limit: "16kb",}));
app.use(express.urlencoded({limit: "16kb",extended:true}));


// router import 

import userRouter from "./routes/user.routes.js"

app.use("/api/users",userRouter)


export { app };
