const express = require('express');
const db = require('../database/db');
const router = express.Router();

// GET all cities
router.get('/cities', async (req, res) => {
  try {
    const query = 'SELECT * FROM cities ORDER BY name';
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch cities',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        data: results
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cities',
      error: error.message
    });
  }
});

// GET all locations
router.get('/locations', async (req, res) => {
  try {
    const query = `
      SELECT l.*, c.name as city_name 
      FROM locations l 
      LEFT JOIN cities c ON l.city_id = c.id 
      ORDER BY l.name
    `;
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch locations',
          error: err.message
        });
      }

      res.status(200).json({
        success: true,
        data: results
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch locations',
      error: error.message
    });
  }
});

module.exports = router;