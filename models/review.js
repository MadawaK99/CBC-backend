import mongoose from 'mongoose';
 
const reviewSchema = mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    comment:{
        type:String,
        required:true  
    },
    rating:{
        type:Number,
        required:true
    },
    image:{
        type:String,
    }

}


)
const Review = mongoose.model("Review",reviewSchema)
export default Review;