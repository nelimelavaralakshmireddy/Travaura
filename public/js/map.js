
  document.addEventListener("DOMContentLoaded", function () {
    const lat = Number("<%= listing.latitude %>");
    const lng = Number("<%= listing.longitude %>");

    console.log("lat:", lat, "lng:", lng); // ✅ debug log

    if (!lat || !lng) {
      alert("Invalid coordinates for this listing.");
      return;
    }

    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng]).addTo(map)
      .bindPopup("<b><%= listing.title %></b>")
      .openPopup();
  });
