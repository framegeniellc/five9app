import axios from 'axios'

export const ENDPOINTS = {
  FIVE9: '/Five9/',
}

const getDefaultTransport = () => {
  return axios
}
  
  export default getDefaultTransport