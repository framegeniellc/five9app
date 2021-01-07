import { getConfig } from './index'
import Geocode from 'react-geocode'
import { getNearestStores } from '../../components/CustomerAcquisition/Common/store'
import getDefaultTransport, { ENDPOINTS as BASE_ENDPOINTS } from '../api/defaultInterceptor'

const jsonp = require('jsonp')

const ENDPOINTS = {
    TOKEN: `/Account/Login`,
    PROMOTIONS: `GetStorePromotions`,
    NOTESALERTS: `GetStoreSpecialNotesAlerts`,
    STORE: `GetStoreInformation`,
    DOCTOR: `GetStoreDoctorComments`,
    ROOMS: `GetStoreExamRooms`,
}

const acceptedStatusCodes = [200, 201]

const getCachedData = async (transport: any, storeId: number, type: string) => {
  try {
    let cdnBaseUrl = 'https://cdn.nowoptics.com/five9/json/';
    //let requestTYpe = '';
    //const storeParam = typeof storeId !== 'object' ? prependZeros(storeId) : ``

    if ( storeId > 0 ) {
      const file = require('../../../static/mock/data/' + prependZeros(storeId) + '_' + getRequestType(type));

      return { data: file, error: '' }
      /*
      const storeParam = typeof storeId !== 'object' ? `?StoreID=${prependZeros(storeId)}` : `?StoreID=`
      const finalEndpoint = `${BASE_ENDPOINTS.NOBLE_ZEUS_URL}/${storeParam}&endpoint=${type}&format=json`
      const response = await transport.get(finalEndpoint, {timeout: 30000})

      if (response) {
        return response
      }
      */
    } else {
      /*
      const headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
      */
      if (storeId === null || storeId === 0)
      {
        if (type === 'info' && storeId === null) {
          const storeFile = require('../../../static/mock/data/stores.json');

          return { data: storeFile, error: '' }
          //const response = await transport.get(cdnBaseUrl + 'stores.json', { headers: headers } );
          //console.log('jsonp', cdnBaseUrl + 'stores.json')
          /*
          jsonp(cdnBaseUrl + 'stores.json', {  timeout: 300000 }, (err: any, data: any) => {
            if(err) {
              console.log(err)
            } else {
              console.log(data)
            }
          } )
          */

          //return JSON.parse(response)
        } else {
          if (type === 'doctors' || type === 'rooms') {
            return { data: [], error: ''}
          }
        }
      } else {
        const response = await transport.get(cdnBaseUrl + prependZeros(storeId) + '_' + getRequestType(type) + '.json');

        return response
      }

      return { data: [], error: ''}
    }
  } catch(e) {

  }
}

const getEndpointData = async (transport: any, storeId: number, type: string) => {
    try {
        const storeParam = typeof storeId !== 'object' ? `?StoreNumber=${prependZeros(storeId)}` : `?StoreNumber=`
        const finalEndpoint: string = `${BASE_ENDPOINTS.NOBLE_ZEUS_URL}/${BASE_ENDPOINTS.FIVE9}/${getRequestType(type)}${storeParam}`
        const token = await getToken()
        const response = await transport.get(finalEndpoint, getConfig(token, BASE_ENDPOINTS.NOBLE_ZEUS_USERNAME))
        
        if (response.error || response.data.error) {
          return { error: response.error || response.data.error, data: '' }
        }
        
        if (response.data.StatusCode && !acceptedStatusCodes.includes(response.data.StatusCode)) {
          return { error: response.data.Message, data: '' }
        }
        
        return { error: '', data: response?.data }
    } catch (e) {
        return {
          error: e.response?.data.message ? e.response.data.message : 'Unable to retrieve data',
          data: null,
        }
    }
}

const getRequestType = (type: string) => {
  switch(type) {
    case 'offers': {
      return ENDPOINTS.PROMOTIONS
    }
    case 'notes': {
      return ENDPOINTS.NOTESALERTS
    }
    case 'info': {
      return ENDPOINTS.STORE
    }
    case 'doctors': {
      return ENDPOINTS.DOCTOR
    }
    case 'rooms': {
      return ENDPOINTS.ROOMS
    }
  }
}

const prependZeros = (storeId: number) => {
  if (storeId < 10) {
    return '000' + storeId
  }

  if(storeId < 100) {
    return '00' + storeId
  }

  if(storeId < 1000) {
    return '0' + storeId
  }

  return storeId
}

const getToken = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await getDefaultTransport().get(
    `${BASE_ENDPOINTS.NOBLE_ZEUS_URL}/Account/Login?UserName=${BASE_ENDPOINTS.NOBLE_ZEUS_USERNAME}&Password=${BASE_ENDPOINTS.API_NOBLE_ZEUS_PW}`,
    config,
  )
  return response.data
}

const getLocationFromZip = async (zip: string, stores: any, setGeoResponse: any) => {
  Geocode.setRegion('en')
  Geocode.setApiKey(process.env.GMAP_KEY)
  return Geocode.fromAddress(zip).then( response => {
    setGeoResponse(getNearestStores(response, stores))
  }).then(response => {
    //console.log(response);
  }).catch(e => {
      console.log(e);
  });
}

export { getEndpointData, getLocationFromZip, getCachedData }
