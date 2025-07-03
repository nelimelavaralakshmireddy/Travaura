// scripts/updateCoords.js
require('dotenv').config(); // to load .env
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const getCoordinates = require("../utils/geocoding");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // or from process.env

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Connected to DB");

  const listings = await Listing.find({});

  for (let listing of listings) {
    // Skip listings that already have coordinates
    if (!listing.latitude || !listing.longitude) {
      const coords = await getCoordinates(listing.location);
      if (coords) {
        listing.latitude = coords.lat;
        listing.longitude = coords.lng;
        await listing.save();
        console.log(`📍 Updated "${listing.title}" -> ${coords.lat}, ${coords.lng}`);
      } else {
        console.log(`❌ Could not geocode: ${listing.location}`);
      }
    }
  }

  console.log("✅ All listings updated.");
  process.exit();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
