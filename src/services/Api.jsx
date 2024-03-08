import axios from "axios";
// url base: https://api.themoviedb.org/3/
// Api: 49f77d92e98ae46cc56542a903ab68ad

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})

export default api;