import Product from "../models/product.js";
import {isAdmin} from "./userController.js"

export async function getProducts(req,res){

    try{
        if(isAdmin(req)){
            const Products= await Product.find()
            res.json(Products)
        }
        else{
            const Products= await Product.find({isAvailable:true})
            res.json(Products)
        }
    }
    catch(err){
        res.json({
            message:"faild to find",
            error:err
        })
    }
    
}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
           message:"You are not authorized to delete products"
        })
        return
      }
      try{
     await Product.deleteOne({productId : req.body.productId})
     res.json(
        {message:"Product deleted successfully"

                            })
        }catch(err){
            res.status(500).json({
                message:"Failed to delete product",
                error:err
            })
        }

 
        }



export function saveProducts(req,res){
   if(!isAdmin(req)){
     res.status(403).json({
        message:"You are not authorized to add products"
     })
     return
   } 
   const product =new Product(
    req.body
   );

    
       product.save().then(()=>{
         res.json({
            message:"Product added sucessfully"
    
         })
        })


}