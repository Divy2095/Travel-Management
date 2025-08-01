const db = require("./database/db");

// db.query("DROP TABLE IF EXISTS users");
// db.query("DROP TABLE IF EXISTS drivers");
// db.query("DROP TABLE IF EXISTS vehicles");
// db.query("DROP TABLE IF EXISTS trips");
// db.query("DROP TABLE IF EXISTS locations");
// db.query("DROP TABLE IF EXISTS cities");

const users = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    login_type ENUM('admin', 'driver', 'customer') NOT NULL,
    image VARCHAR(500), -- ✅ Added image column
    status ENUM('active', 'inactive') DEFAULT 'active',
    entry_by VARCHAR(100),
    update_by VARCHAR(100),
    entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const vehicles = `
CREATE TABLE IF NOT EXISTS vehicles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehicle_number VARCHAR(200) UNIQUE,
  type VARCHAR(50),
  model VARCHAR(50),
  capacity INT,
  status ENUM('available', 'in_use', 'maintenance') DEFAULT 'available',
  entry_by VARCHAR(100),
  update_by VARCHAR(100),
  entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const drivers = `
CREATE TABLE IF NOT EXISTS drivers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(15) NOT NULL,
  license_number VARCHAR(50) NOT NULL,
  license_expiry DATE NOT NULL,
  address TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  assigned_vehicle_id INT,
  joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  profile_photo TEXT,
  rating DECIMAL(2,1),
  entry_by VARCHAR(100),
  update_by VARCHAR(100),
  entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_vehicle_id) REFERENCES vehicles(id)
)`;

const cities = `
CREATE TABLE IF NOT EXISTS cities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  state VARCHAR(100),
  country VARCHAR(100),
  entry_by VARCHAR(100),
  update_by VARCHAR(100),
  entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)`;

const locations = `
CREATE TABLE IF NOT EXISTS locations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  address TEXT,
  pincode VARCHAR(10),
  city_id INT,
  entry_by VARCHAR(100),
  update_by VARCHAR(100),
  entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
)`;

const trips = `
CREATE TABLE IF NOT EXISTS trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  image VARCHAR(255) NOT NULL,
  location_id INT,
  price DECIMAL(10,2),
  duration VARCHAR(50),
  max_participants INT DEFAULT 10,
  status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
  entry_by VARCHAR(100),
  update_by VARCHAR(100),
  entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL
)`;

const bookings = `
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  trip_id INT NOT NULL,
  user_id INT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  emergency_contact VARCHAR(255),
  emergency_phone VARCHAR(20),
  participants INT NOT NULL DEFAULT 1,
  special_requests TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
  entry_by VARCHAR(100),
  update_by VARCHAR(100),
  entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
)`;

const tables = [users, vehicles, cities, locations, drivers, trips, bookings];

tables.forEach((query, index) => {
  db.query(query, (err) => {
    if (err) {
      console.error(`Error creating table ${index + 1}:`, err.message);
    } else {
      console.log(`Table ${index + 1} created or already exists`);
    }
  });
});
