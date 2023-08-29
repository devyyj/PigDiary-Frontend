import axios from "axios";
const api = new axios.create({baseURL: process.env.REACT_APP_BE_URL});

export {api}