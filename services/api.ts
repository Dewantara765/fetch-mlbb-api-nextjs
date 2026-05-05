import axios from 'axios';

const api = axios.create({
  baseURL: 'https://openmlbb.fastapicloud.dev/api/',
});

export default api;