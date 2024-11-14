import axios from "axios"

const token =JSON.parse(localStorage.getItem('user')) 

const axiosApi = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {"Authorization" : `Bearer ${token}`}
})

const axiosApiWithoutHeader = axios.create({
    baseURL: 'http://localhost:4000/api',
    headers: {'Content-Type' : 'application/json'}
})


axiosApi.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const status = err.response.status;
      
  
      if (status === 403) {
        // Coding
      } else if (status === 429) {
        // Coding
      } else if (status === 404) {
        // Coding
      } else if (status === 401) {
        // Navigate to login page
      }
  
      return Promise.reject(err);
    }
  );

  axiosApiWithoutHeader.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      const status = err.request.status;
      console.log(status)
  
      // if (status === 403) {
      //   // Coding
      // } else if (status === 429) {
      //   // Coding
      // } else if (status === 404) {
      //   // Coding
      // } else if (status === 401) {
      //   // Navigate to login page
      // }
  
      return Promise.reject(err);
    }
  );
export {axiosApi,axiosApiWithoutHeader}