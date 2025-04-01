const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = async (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }
  
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    database = client;
    callback(null, database);
  } catch (err) {
    callback(err);
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized. Call initDb first.');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};