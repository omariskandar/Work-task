const mysql = require('mysql2');
require('dotenv').config();

// Check if we should use mock database
const useMockDb = process.env.MOCK_DB === 'true';

let promisePool;

if (useMockDb) {
  // Use mock database (in-memory)
  console.log('📦 Using mock in-memory database (MOCK_DB=true)');
  promisePool = require('./mockPool');
} else {
  // Create a real MySQL connection pool
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'content_management',
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  promisePool = pool.promise();
}

// Test database connection
const testConnection = async () => {
  if (useMockDb) {
    console.log('✅ Mock database ready (no real MySQL connection needed)');
    return true;
  }
  
  try {
    const connection = await promisePool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = { pool: promisePool, testConnection };
