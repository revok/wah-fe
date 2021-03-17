import axios, { AxiosInstance } from 'axios';

const axiosInstance =  axios.create({
  baseURL: `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});


// If the token expired we're going to need to clear it.
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }

    return error;
  });


// If we have a token add it to the headers.
axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.common = {
        ...config.headers.common,
        'Authorization': localStorage.getItem('token'),
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  });

export default axiosInstance;