const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://simple-mern-pos-api.vercel.app/api'
  : 'http://localhost:5000/api';

export default API_BASE_URL;