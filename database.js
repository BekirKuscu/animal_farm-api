const { Pool } = require('pg');

const connectionString = 'postgres://rbguunuy:0dqJr89cfD0zjCURbhs03SIwDfiBx79p@flora.db.elephantsql.com/rbguunuy';

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}
