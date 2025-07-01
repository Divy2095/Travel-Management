const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../database/db');
const router = express.Router();

// POST route to add a new trip
router.post('/add', async (req, res) => {
  try {
    const { title, description, date, location_id, price, duration, max_participants } = req.body;
    
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'No image file uploaded'
      });
    }

    const image = req.files.image;

    if (!title || !description || !date) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and date are required'
      });
    }

    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(image.name);
    const filename = 'trip-' + uniqueSuffix + fileExtension;
    const uploadPath = path.join(uploadsDir, filename);

    await image.mv(uploadPath);

    const query = `INSERT INTO trips 
      (title, description, date, image, location_id, price, duration, max_participants) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    const params = [
      title, 
      description, 
      date, 
      filename, 
      location_id || null, 
      price || null, 
      duration || null, 
      max_participants || 10
    ];

    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to save trip to database',
          error: err.message
        });
      }

      const tripData = {
        id: result.insertId,
        title,
        description,
        date,
        image: filename,
        imagePath: `/uploads/${filename}`,
        location_id: location_id || null,
        price: price || null,
        duration: duration || null,
        max_participants: max_participants || 10
      };

      res.status(201).json({
        success: true,
        message: 'Trip added successfully!',
        data: tripData
      });
    });

  } catch (error) {
    console.error('Error adding trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add trip',
      error: error.message
    });
  }
});

// GET route to fetch all trips with location details
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT t.*, l.name as location_name, l.address as location_address, c.name as city_name
      FROM trips t
      LEFT JOIN locations l ON t.location_id = l.id
      LEFT JOIN cities c ON l.city_id = c.id
      ORDER BY t.created_at DESC
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to fetch trips',
          error: err.message
        });
      }

      const tripsWithImagePath = results.map(trip => ({
        ...trip,
        imagePath: `/uploads/${trip.image}`
      }));

      res.status(200).json({
        success: true,
        message: 'Trips fetched successfully',
        data: tripsWithImagePath
      });
    });
  } catch (error) {
    console.error('Error fetching trips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trips',
      error: error.message
    });
  }
});

// PUT route to update a trip
router.put('/:id', async (req, res) => {
  try {
    const tripId = req.params.id;
    const { title, description, date, location_id, price, duration, max_participants } = req.body;
    
    let query = `UPDATE trips SET 
      title = ?, description = ?, date = ?, location_id = ?, price = ?, duration = ?, max_participants = ? 
      WHERE id = ?`;
    let params = [title, description, date, location_id || null, price || null, duration || null, max_participants || 10, tripId];
    
    if (req.files && req.files.image) {
      const image = req.files.image;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(image.name);
      const filename = 'trip-' + uniqueSuffix + fileExtension;
      const uploadPath = path.join(__dirname, '../uploads', filename);
      
      await image.mv(uploadPath);
      
      query = `UPDATE trips SET 
        title = ?, description = ?, date = ?, image = ?, location_id = ?, price = ?, duration = ?, max_participants = ? 
        WHERE id = ?`;
      params = [title, description, date, filename, location_id || null, price || null, duration || null, max_participants || 10, tripId];
    }

    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to update trip',
          error: err.message
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Trip not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Trip updated successfully!'
      });
    });

  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: error.message
    });
  }
});

// Keep existing DELETE route...
router.delete('/:id', async (req, res) => {
  // ... existing delete code
});

module.exports = router;