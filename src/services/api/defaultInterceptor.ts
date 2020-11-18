import axios from 'axios'

export const ENDPOINTS = {
  FIVE9: '/WebClientDevelopment/Five9/',
}

const getDefaultTransport = () => {
  return axios
}
  
  export default getDefaultTransport