const { Pool } = require('pg');

const connectionString = 'postgres://rbguunuy:0dqJr89cfD0zjCURbhs03SIwDfiBx79p@flora.db.elephantsql.com/rbguunuy';

const pool = new Pool({
  connectionString: connectionString,
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database', err);
    process.exit(-1);
  }
};

const getDB = () => {
  if (!pool) {
    console.error('No database connection available');
    process.exit(-1);
  }
  return pool;
};

module.exports = { connectDB, getDB };
