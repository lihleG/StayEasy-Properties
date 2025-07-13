import express from 'express';
import Property from '../models/Property.js';

const router = express.Router();

// GET properties (already existing route)
router.get('/', async (req, res) => {
  const { search = '', category, location } = req.query;
  const searchRegex = new RegExp(search, 'i');

  const filter = {
    $and: [
      { $or: [
        { title: searchRegex },
        { location: searchRegex },
        { category: searchRegex },
      ] }
    ]
  };

  if (category && category !== 'Select Category') {
    filter.$and.push({ category });
  }
  if (location && location !== 'Select Location') {
    filter.$and.push({ location });
  }

  try {
    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
});

// ✅ ADD THIS: POST /api/properties (create property)
router.post('/', async (req, res) => {
  const { title, description, price, location, category } = req.body;

  try {
    const newProperty = new Property({ title, description, price, location, category });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save property', details: error.message });
  }
});

export default router;

