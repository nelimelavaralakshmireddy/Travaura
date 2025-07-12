const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const getCoordinates = require("../utils/geocoding");

// Index Route
router.get(
  "/",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { search, category } = req.query;
    let allListings;
    let filterQuery = {};
    
    // Handle search
    if (search) {
      filterQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Handle category filter
    if (category && category !== 'all') {
      filterQuery.category = category;
    }
    
    allListings = await Listing.find(filterQuery);
    
    res.render("listings/index.ejs", { allListings, search, category });
  })
);

// New Route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Create Route
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    // ✅ Get coordinates from OpenCage
    const coords = await getCoordinates(newListing.location);
    console.log("📍 Geocoded:", coords);
    console.log("📍 Geocoded:", coords);
    newListing.latitude = coords.lat;
    newListing.longitude = coords.lng;
    


    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  })
);

// Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");

     const hasCoordinates = listing.latitude !== undefined && listing.longitude !== undefined;

      if (!hasCoordinates) {
        listing.latitude = 27.1751;
        listing.longitude = 78.0421;
      }


    res.render("listings/show.ejs", { listing });
  })
);

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    // Update form fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;
    listing.category = req.body.listing.category;

    // Get updated coordinates if location changed
    const coords = await getCoordinates(listing.location);
    listing.latitude = coords.lat;
    listing.longitude = coords.lng;

    // If image updated
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  })
);

module.exports = router;
