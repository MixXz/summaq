import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 50000,
});

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
