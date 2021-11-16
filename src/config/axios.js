
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://brave-fermat-1b9f5f.netlify.app/payments'
  });

export default axiosInstance;