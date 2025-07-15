import axios from 'axios';

export async function handler(event, context) {
  try {
    const response = await axios.get('https://stayeasy-backend.onrender.com/api/properties');
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Optional if calling from Netlify frontend
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Netlify Function Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
}
