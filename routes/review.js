const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isReviewAuthor} = require("../middleware.js");

//reviews
//post route
router.post("/", 
  isLoggedIn,wrapAsync(async(req,res) => {
    console.log(req.params.id);
 let  listing = await Listing.findById(req.params.id);
 let newReview = new Review(req.body.review);
newReview.author = req.user._id;
 listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
})
);
// delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(async (req,res) =>{
  let {id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{ $pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
   res.redirect(`/listings/${id}`);
})
);


module.exports =  router;