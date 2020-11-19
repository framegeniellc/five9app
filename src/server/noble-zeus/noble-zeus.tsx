/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
require('dotenv').config()
const axios = require('axios')

const NOBLE_ZEUS_URL = process.env.NOBLE_ZEUS_URL
const NOBLE_ZEUS_USERNAME = process.env.NOBLE_ZEUS_USERNAME
const NOBLE_ZEUS_PW = process.env.NOBLE_ZEUS_PW

const getToken = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await axios.get(
    `${NOBLE_ZEUS_URL}/Account/Login?UserName=${NOBLE_ZEUS_USERNAME}&Password=${NOBLE_ZEUS_PW}`,
    config,
  )
  return response.data
}

const getNobleZeusTransport = () => {
  const apiAxiosInstance = axios.create({ baseURL: NOBLE_ZEUS_URL })
  /**
   * Gets called before each request
   */
  apiAxiosInstance.interceptors.request.use(
    async config => {
      return getToken().then(access_token => {
        config.headers['Content-Type'] = 'application/json'
        config.headers.Authorization = `Bearer ${access_token}:${NOBLE_ZEUS_USERNAME}`
        return Promise.resolve(config)
      })
    },
    error => {
      return Promise.reject(error)
    },
  )

  apiAxiosInstance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      if (error.response.status === 409) {
        return error.response
      }
      return Promise.reject(error)
    },
  )

  return apiAxiosInstance
}

module.exports = getNobleZeusTransport
