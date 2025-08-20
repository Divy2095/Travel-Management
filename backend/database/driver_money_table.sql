CREATE TABLE IF NOT EXISTS driver_money (
    id INT PRIMARY KEY AUTO_INCREMENT,
    driver_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type ENUM('credit', 'debit') NOT NULL,
    description TEXT NOT NULL,
    trip_id INT,
    entry_by VARCHAR(255),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE CASCADE,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE SET NULL
);
