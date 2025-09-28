const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Update the drivers table schema
const updateSchema = async () => {
  try {
    // First, make the column VARCHAR to handle any value
    await connection
      .promise()
      .query(
        "ALTER TABLE drivers MODIFY COLUMN status VARCHAR(20) NOT NULL DEFAULT 'offline'"
      );

    console.log("Changed to VARCHAR");

    // Update any invalid status values to 'offline'
    await connection
      .promise()
      .query(
        "UPDATE drivers SET status = 'offline' WHERE status NOT IN ('available', 'unavailable', 'on_trip', 'offline')"
      );

    console.log("Updated invalid statuses");

    // Then modify the column to be ENUM
    await connection
      .promise()
      .query(
        "ALTER TABLE drivers MODIFY COLUMN status ENUM('available', 'unavailable', 'on_trip', 'offline') NOT NULL DEFAULT 'offline'"
      );

    console.log("Successfully updated drivers table schema");
    process.exit(0);
  } catch (error) {
    console.error("Error updating schema:", error);
    process.exit(1);
  }
};

// Run the update
updateSchema();
