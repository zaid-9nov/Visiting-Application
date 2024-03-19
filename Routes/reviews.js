const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../Schema/Schema1");
const Review = require("../Schema/review.js");

router.delete("/:reviewID", async (req, res) => {

  if(!req.isAuthenticated()){
    console.log("You must logged in first to proceed further !!");
    res.redirect("/login");
  }
  
  let { id, reviewID } = req.params;

  await Review.findByIdAndDelete(reviewID);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });

  res.redirect(`/listing/${id}`);
});

// review
// post route
router.post("/", async (req, res) => {
  let { id } = req.params;
  console.log("Post Req Accepted", id);
  let { rating, comment } = req.body;
  let feedback = new Review({
    comment: comment,
    rating: rating,
  });
  let place = await Listing.findById(id);
  place.reviews.push(feedback);

  let res1 = await feedback.save();
  let res2 = await place.save();

  console.log("res1 and res2");
  console.log(res1, res2);
  res.redirect(`/listing/${id}`);
});


module.exports= router;