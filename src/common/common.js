import axios from "axios";

export const api = new axios.create({baseURL: process.env.REACT_APP_BE_URL});