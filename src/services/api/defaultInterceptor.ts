import axios from 'axios'

export const ENDPOINTS = {
  FIVE9: 'Five9',
  NOBLE_ZEUS_URL: process.env.NOBLE_ZEUS_URL,
  NOBLE_ZEUS_USERNAME: process.env.NOBLE_ZEUS_USERNAME,
  API_NOBLE_ZEUS_PW: process.env.API_NOBLE_ZEUS_PW,
}

const getDefaultTransport = () => {
  return axios
}
  
export default getDefaultTransport