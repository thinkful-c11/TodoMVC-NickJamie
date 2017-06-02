'use strict';

// const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'postgresql://dev:dev@localhost/todo-app';

const DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'postgres://hgvramvj:OTjHvLGC9yZm1iF47l9fpJmQEqUIbb-Q@stampy.db.elephantsql.com:5432/hgvramvj';

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  pool: { min: 0, max: 3 },
  // debug: true
};


exports.PORT = process.env.PORT || 8080; 