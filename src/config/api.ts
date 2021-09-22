import { create } from 'apisauce';

const api = create({
  baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  withCredentials: true,
});

export default api;
