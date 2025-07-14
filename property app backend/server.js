import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import propertyRoutes from './routes/propertyRoutes.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key_here';

// CORS Setup: Allow Netlify, Localhost:5173, and Localhost:3000
const allowedOrigins = [
  'https://stayeasyproperties.netlify.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(helmet());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS Error: Blocked origin -> ${origin}`);
      callback(new Error(`CORS Error: ${origin} is not allowed`));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10kb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// MongoDB Connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || 'property-listing'
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

// Routes
app.use('/api/properties', propertyRoutes);

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ userId: '123', username: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

// Health Check (Render-friendly)
app.get('/', (req, res) => {
  res.send('🚀 StayEasy Backend API is running');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.message);
  res.status(500).json({ message: 'Internal server error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});





