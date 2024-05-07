import express from "express";
import {PORT, MONGO_URL} from "../backend/config.js"; 
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import userRoutes from './routes/userRoutes.js';
import cors from "cors";

const app = express();


app.use(express.json());

app.use(cors({origin: '*' }))

app.use(
    cors({
        origin:"http://localhost:3000",
        methods:['GET', 'POST', "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
)

app.use("/book", booksRoute);
app.use("/user", userRoutes);

mongoose
.connect(MONGO_URL)
.then(()=>{
console.log("Good to go");
app.listen(PORT,()=>{
    console.log("Listening");
});
})
.catch((error)=>{
    console.log(error);
})