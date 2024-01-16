import axios from "axios";

const instance = axios.create({
      // baseURL: 'http://localhost:5000/',
      baseURL: 'https://rest-os-server-11.vercel.app/',
      withCredentials:true
});


export const useAxios = () => {
      return instance
}

