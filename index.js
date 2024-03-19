const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./Schema/Schema1");
const Review = require("./Schema/review.js")
const initdata = require("./Schema/initial_data.js");
const path = require("path");
const methodOverride= require("method-override")
const { v4: uuidv4 } = require("uuid");
const ejsMate= require("ejs-mate");
const listingsRouter = require("./Routes/listing.js")
const reviewsRouter= require("./Routes/reviews.js")
const session = require("express-session");
const passport= require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Schema/user.js"); 
const userRouter = require("./Routes/user.js");


app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true })); //for Parsing the data
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


app.listen(8080, () => {
  console.log("Server started on port 8080");
});

main()
  .then(() => {
    console.log("database working !");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/MongooseDB");
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(initdata.data);
};
initDB();

let sessionOption = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
};

app.use((req, res, next)=>{
  res.locals.currUser= req.user;
  console.log("Locals is : ", req.user);    // error in storing req.user content, showing #undefined
  next();
})


app.use(session(sessionOption));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/demouser", async (req, res)=>{

//   let fakeUser= new User({
//     email : "zaid9@gmail.com",
//     username : "zaidkhanM"
//   });

//   let registeredUser= await User.register(fakeUser, "zaid8214");

//   res.send(registeredUser);
// })

app.use("/listing", listingsRouter)

app.get("/", (req, res) => {
  res.send("This is Root Page");
});

app.use("/listing/:id/reviews", reviewsRouter)
app.use("/", userRouter);

