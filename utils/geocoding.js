const axios = require("axios");

const getCoordinates = async (location) => {
  const apiKey = process.env.OPENCAGE_API_KEY;

  const response = await axios.get("https://api.opencagedata.com/geocode/v1/json", {
    params: {
      key: apiKey,
      q: location,
      limit: 1
    }
  });

  const geometry = response.data.results[0]?.geometry;
  return geometry; // { lat: 25.7617, lng: -80.1918 }
};

module.exports = getCoordinates;
