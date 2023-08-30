import axios from 'axios'
// eslint-disable-next-line new-cap
const api = new axios.create({ baseURL: process.env.REACT_APP_BE_URL })

export { api }
