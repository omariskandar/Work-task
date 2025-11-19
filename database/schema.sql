-- Create database
CREATE DATABASE IF NOT EXISTS content_management;

-- Use the database
USE content_management;

-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('Video', 'Lecture', 'PDF') NOT NULL,
  url VARCHAR(500) NOT NULL,
  uploadedFile VARCHAR(255) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on created_at for faster sorting
CREATE INDEX idx_created_at ON content(created_at);

-- Insert sample data (optional)
INSERT INTO content (title, author, description, type, url) VALUES
('Introduction to Node.js', 'John Doe', 'A comprehensive guide to getting started with Node.js', 'Video', 'https://example.com/nodejs-intro'),
('Advanced MySQL Queries', 'Jane Smith', 'Learn advanced SQL techniques and optimization', 'Lecture', 'https://example.com/mysql-advanced'),
('JavaScript ES6 Guide', 'Bob Johnson', 'Modern JavaScript features and best practices', 'PDF', 'https://example.com/js-es6-guide');
