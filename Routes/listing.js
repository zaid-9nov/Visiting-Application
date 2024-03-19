const express = require("express");
const router = express.Router();
const Listing = require("../Schema/Schema1");
const Review = require("../Schema/review.js")


router.get("/new", (req, res) => {

  if(!req.isAuthenticated()){
    console.log("You must logged in first to proceed further !!");
    res.redirect("/login");
  }
  res.render("new.ejs");
});

//READ Route
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  let doc = await Listing.findById(id).populate("reviews");
  console.log("id is : ", id);
  console.log(doc);
  res.render("show.ejs", { doc });
  // res.send("working !!");
});

//INDEX Route
router.get("/", async (req, res) => {
  const lists = await Listing.find({});

  res.render("list.ejs", { lists });
});



router.post("/", (req, res) => {
  console.log(req.body);
  let { title, description, image, price, location, country } = req.body;
  let doc = new Listing({
    title: title,
    description: description,
    image: image,
    price: price,
    location: location,
    country: country,
  });

  doc.save();
  res.redirect("/listing");
});

router.get("/:id/edit", async (req, res) => {

  if(!req.isAuthenticated()){
    console.log("You must logged in first to proceed further !!");
    res.redirect("/login");
  }

  let { id } = req.params;

  let doc = await Listing.findById(id);

  res.render("edit.ejs", { doc });
});

router.put("/:id", async (req, res) => {

  if(!req.isAuthenticated()){
    console.log("You must logged in first to proceed further !!");
    res.redirect("/login");
  }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  res.redirect(`/listing/${id}`);
});

router.delete("/:id", async (req, res) => {

  if(!req.isAuthenticated()){
    console.log("You must logged in first to proceed further !!");
    res.redirect("/login");
  }
  
  let { id } = req.params;
  let doc = await Listing.findByIdAndDelete(id);
  console.log(doc);
  res.redirect("/listing");
});



module.exports= router;