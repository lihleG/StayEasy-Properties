import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_strong_secret_key_here';

// Data you want to encode inside the token (the payload)
const payload = {
  userId: '123456',
  username: 'luckyguma',
  role: 'admin'
};

// Create token, expires in 1 hour
const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

console.log('JWT Token:', token);
