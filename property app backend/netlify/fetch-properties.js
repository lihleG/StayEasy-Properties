import mongoose from 'mongoose';
import Property from './models/Property.js';
import dotenv from 'dotenv';

dotenv.config();

let conn = null;

// Connect to MongoDB once (reuse connection on cold starts)
async function connectToDatabase() {
  if (conn) return conn;

  conn = await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME || 'property-listing'
  });

  return conn;
}

export async function handler(event, context) {
  try {
    await connectToDatabase();

    const properties = await Property.find().lean();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(properties),
    };
  } catch (error) {
    console.error('Netlify Function Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}

