const db = require("./database/db");

const updateDriverStatus = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Only date part

  console.log("🔄 Running driver status update...");

  // Get all trips with assigned drivers
  db.query("SELECT id, driver_id, date FROM trips WHERE driver_id IS NOT NULL", (err, trips) => {
    if (err) return console.error("Error fetching trips:", err);

    trips.forEach((trip) => {
      const tripDate = new Date(trip.date);
      tripDate.setHours(0, 0, 0, 0);

      if (tripDate > today) {
        // Future trip -> driver on_trip, keep driver_id
        db.query("UPDATE drivers SET status='on_trip' WHERE id = ?", [trip.driver_id], (err) => {
          if (err) console.error("Error updating driver status (on_trip):", err);
        });
      } else if (tripDate < today) {
        // Past trip -> driver available, remove driver assignment
        db.query(
          "UPDATE drivers SET status='active' WHERE id = ?",
          [trip.driver_id],
          (err) => {
            if (err) console.error("Error updating driver status (active):", err);
          }
        );

        // Remove driver from trip
        db.query(
          "UPDATE trips SET driver_id = NULL WHERE id = ?",
          [trip.id],
          (err) => {
            if (err) console.error("Error removing driver from past trip:", err);
          }
        );
      }
      // Trip for today -> leave as is
    });
  });
};

module.exports = updateDriverStatus;
