const { pool } = require('../config/db');

// GET all content items
const getAllContent = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM content ORDER BY created_at DESC'
    );
    
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

// GET single content item by ID
const getContentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.query(
      'SELECT * FROM content WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

// POST create new content item
const createContent = async (req, res, next) => {
  try {
    const { title, author, description, type, url, uploadedFile } = req.body;
    
    // Validation
    if (!title || !author || !description || !type || !url) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['title', 'author', 'description', 'type', 'url']
      });
    }
    
    // Validate content type
    const validTypes = ['Video', 'Lecture', 'PDF'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ 
        error: 'Invalid content type',
        validTypes: validTypes
      });
    }
    
    // Validate URL format
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(url)) {
      return res.status(400).json({ 
        error: 'Invalid URL format. Must start with http:// or https://'
      });
    }
    
    const [result] = await pool.query(
      'INSERT INTO content (title, author, description, type, url, uploadedFile) VALUES (?, ?, ?, ?, ?, ?)',
      [title, author, description, type, url, uploadedFile || null]
    );
    
    // Fetch the created content
    const [rows] = await pool.query(
      'SELECT * FROM content WHERE id = ?',
      [result.insertId]
    );
    
    res.status(201).json({
      message: 'Content created successfully',
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// PUT update content item by ID
const updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, description, type, url, uploadedFile } = req.body;
    
    // Check if content exists
    const [existing] = await pool.query(
      'SELECT * FROM content WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    // Validate content type if provided
    if (type) {
      const validTypes = ['Video', 'Lecture', 'PDF'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ 
          error: 'Invalid content type',
          validTypes: validTypes
        });
      }
    }
    
    // Validate URL format if provided
    if (url) {
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(url)) {
        return res.status(400).json({ 
          error: 'Invalid URL format. Must start with http:// or https://'
        });
      }
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (author !== undefined) {
      updates.push('author = ?');
      values.push(author);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (type !== undefined) {
      updates.push('type = ?');
      values.push(type);
    }
    if (url !== undefined) {
      updates.push('url = ?');
      values.push(url);
    }
    if (uploadedFile !== undefined) {
      updates.push('uploadedFile = ?');
      values.push(uploadedFile);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    
    await pool.query(
      `UPDATE content SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    // Fetch updated content
    const [rows] = await pool.query(
      'SELECT * FROM content WHERE id = ?',
      [id]
    );
    
    res.json({
      message: 'Content updated successfully',
      data: rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// DELETE content item by ID
const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if content exists
    const [existing] = await pool.query(
      'SELECT * FROM content WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    await pool.query('DELETE FROM content WHERE id = ?', [id]);
    
    res.json({
      message: 'Content deleted successfully',
      data: existing[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent
};
