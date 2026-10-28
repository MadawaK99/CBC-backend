import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt, { decode } from 'jsonwebtoken';

const app = express();
app.use(bodyParser.json());
app.use(
    (req,res,next)=>{
        const tokenString =req.header("Authorization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer ","");
            console.log(token);
            jwt.verify(token,"cbc-batch-five#123#",
                (err,decoded)=>{
                    if(decoded != null){
                        req.user =decoded;
                        next();
                    }
                    else{
                        console.log("invalid token")
                        res.status(403).json({
                            message : "Invalid token"
                        })
                    }
                }
            )
        }else{
            next();
        }
        
    }
)


mongoose.connect("mongodb://admin:123@ac-x6lbrxr-shard-00-00.koq0ruc.mongodb.net:27017,ac-x6lbrxr-shard-00-01.koq0ruc.mongodb.net:27017,ac-x6lbrxr-shard-00-02.koq0ruc.mongodb.net:27017/?ssl=true&replicaSet=atlas-k62gxg-shard-0&authSource=admin").then(()=>{console.log("Connected to the database ")}
).catch(()=>{console.log("Database connection failid")})


app.use("/products",productRouter);
app.use("/users",userRouter); 

app.listen(5000,()=>{console.log('server is running on port 5000')});



    
 



