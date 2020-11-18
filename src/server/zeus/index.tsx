/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
require('dotenv').config()
const qs = require('querystring')
const axios = require('axios')
const { appendQueryString } = require('../utils/urlformatters')

const CACHE_ENDPOINT = process.env.CACHE_ENDPOINT
const FIVE9_URL = process.env.FIVE9_URL
const FIVE9_USERNAME_WS = process.env.FIVE9_USERNAME_WS
const FIVE9_PASSWORD_WS = process.env.FIVE9_PASSWORD_WS
const FIVE9_SECRET_WS = process.env.FIVE9_SECRET_WS

const FIVE9_TOKEN_CACHE_KEY = 'zeus-token'
const FIVE9_TOKEN_WS_CACHE_KEY = 'zeus-token-ws'

const getToken = async (type, existingAuth) => {
  let requestBody = {}
  let tokenCacheKey = ''

  if (existingAuth) {
    return existingAuth
  }

  requestBody = {
    username: FIVE9_USERNAME_WS,
    password: FIVE9_PASSWORD_WS,
    grant_type: 'password',
    client_secret: FIVE9_SECRET_WS,
  }

  tokenCacheKey = FIVE9_TOKEN_WS_CACHE_KEY

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  if (CACHE_ENDPOINT) {
    try {
      const token = await axios.post(
        `${CACHE_ENDPOINT}/token`,
        qs.stringify({
          ...requestBody,
          cacheKey: tokenCacheKey,
          baseUrl: FIVE9_URL,
        }),
        config,
      )
      return token.data ? token.data.access_token : null
    } catch (err) {
      console.log('err', err.message)
    }
  }

  const response = await axios.post(`${FIVE9_URL}/token`, qs.stringify(requestBody), config)
  return response.data ? response.data.access_token : null
}

const getZeusTransport = (type, cache, existingAuth = '') => {
  const hasCache = CACHE_ENDPOINT !== '' && cache !== undefined && cache === 'true'
  const targetEndpoint = !hasCache ? FIVE9_URL : CACHE_ENDPOINT
  const apiAxiosInstance = axios.create({ baseURL: targetEndpoint })

  apiAxiosInstance.interceptors.request.use(
    async config => {
      return getToken(type, existingAuth).then(access_token => {
        config.headers.Authorization = `Bearer ${access_token}`
        if (config.headers.cacheKey) {
          if (hasCache && config.url && config.method === 'get') {
            config.url = appendQueryString(config.url, { cacheKey: config.headers.cacheKey, baseUrl: ZEUS_URL })
          }
        }
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
      if (error && error.response) {
        if (error.response.status === 400) {
          return error.response
        }
        if (error.response.status === 401) {
          return error.response
        }
        if (error.response.status === 403) {
          return error.response
        }
        if (error.response.status === 404) {
          return error.response
        }
        if (error.response.status === 409) {
          return error.response
        }
        if (error.response.status === 406) {
          return error.response
        }

        // trial
        return error.response
      }

      if (error && error.message) {
        return error.message
      }
      return Promise.reject(error)
    },
  )

  return apiAxiosInstance
}

module.exports = getZeusTransport
