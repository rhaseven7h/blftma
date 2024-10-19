import axios from 'axios';

export const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export const setupInterceptors = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // You can modify the response data here, e.g., handling pagination
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
