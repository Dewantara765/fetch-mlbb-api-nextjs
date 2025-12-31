import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mlbb-stats.ridwaanhall.com/api/',
});

export default api;