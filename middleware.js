const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review");
module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        // res.flash("error","you must login t create listings");
        return  res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async (req,res,next) => {
    let { id } = req.params;
   let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    return res.redirect(`/listings/${id}`);
  }
  next();
};
module.exports.isReviewAuthor = async (req,res,next) => {
    let { id,reviewId } = req.params;
   let review= await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    // res.flash("you are not ");
    return res.redirect(`/listings/${id}`);
  }
  next();
};