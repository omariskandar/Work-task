const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// GET all content items
router.get('/', contentController.getAllContent);

// GET single content item by ID
router.get('/:id', contentController.getContentById);

// POST create new content item
router.post('/', contentController.createContent);

// PUT update content item by ID
router.put('/:id', contentController.updateContent);

// DELETE content item by ID
router.delete('/:id', contentController.deleteContent);

module.exports = router;
