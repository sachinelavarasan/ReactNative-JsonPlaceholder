import axios from 'axios';

apiUrl = 'https://jsonplaceholder.typicode.com';
// apiUrl = 'http://192.168.43.84:8000';

const instance = axios.create({
  baseURL: apiUrl,
});



export default instance;
