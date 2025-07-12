const mongoose = require("mongoose");
const Listing = require("./models/listing");
const User = require("./models/user");
const { data } = require("./init/data");

require("dotenv").config(); // Load environment variables

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL); // updated to match .env
    console.log("✅ MongoDB connected!");

    await Listing.deleteMany({});
    console.log("🗑️ Old listings removed!");

    // Ensure at least one user exists
    let user = await User.findOne();
    if (!user) {
      user = new User({ email: "test@example.com", username: "testuser" });
      await User.register(user, "password123"); // using passport-local-mongoose
      console.log("👤 Test user created!");
    }

    for (let listing of data) {
      listing.owner = user._id; // assign dummy owner
      const newListing = new Listing(listing);
      await newListing.save();
    }

    console.log("🌱 Database seeded with sample listings!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
