
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

console.log("Loaded secret:", process.env.SECRET);
console.log(process.env.SECRET);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dburl= process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto:{
    secret:process.env.SECRET || "fallback-secret",
  },
  touchAfter: 24 * 3600,
});
store.on("error", () =>{
  console.log("ERROR IN MONGO SESSION STORE",error);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET || "fallback-secret",
  resave: false,
  saveUninitialized: true,
};


// app.get("/",(req,res) => {
//     res.send("Hi, Iam root");
// });


app.use(session(sessionOptions));
app.use(flash());
// app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
  // res.locals.success=req.flash("success");
  // res.locals.currUser = req.user;
  next();
});
app.use((req, res, next) => {
  res.locals.currUser = req.user;
  // res.locals.success = req.flash("success");
  // res.locals.error = req.flash("error");
  next();
});


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(8080,() =>{
    console.log("server is listening to port 8080");
});