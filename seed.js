const mongoose = require("mongoose");
const Listing = require("./models/listing"); // This should point to your listing model
const { data } = require("./init/data"); // Import your sample listings

require("dotenv").config(); // To load Atlas DB URL

const dbUrl = process.env.ATLASDB_URL; // Your MongoDB connection string

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl); // Connect to Atlas
  console.log("Database connected");

  await Listing.deleteMany({}); // Remove old listings
  console.log("Old listings removed");

  await Listing.insertMany(data); // Insert new listings
  console.log("New listings inserted");

  mongoose.connection.close(); // Close connection
}
