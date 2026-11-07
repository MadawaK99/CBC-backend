import Review from "../models/review.js";

export async function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message:"You cannot add review. Please login first."
        })
        return
    }
  const fname= req.user.firstName+" "+req.user.lastName;
  const review = new Review({

   name: fname,
   email:req.user.email,
   comment:req.body.comment,
   rating:req.body.rating,
   image:req.user.image

  }

  )

 try {
    await review.save();
    res.status(201).json({
        message:"Review added successfully"
    });
 }
 catch(error){
    res.status(500).json({
        message:"Failed to add review",
        error:error.message
    })
 }

}

export async function getReviews(req, res) {
    try {
        const reviews = await Review.find();

        res.json(reviews);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get reviews"
        });
    }
}

