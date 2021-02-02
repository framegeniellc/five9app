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
    DOCTORAVAILABILITY: `GetStoreDoctorScheduler`,
}

const acceptedStatusCodes = [200, 201]

const getAssetVersion = (length: number) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result;
}

const getCachedData = async (transport: any, storeId: number, type: string) => {
  try {
    let cdnBaseUrl = 'https://cdn.nowoptics.com/five9/json/';
    //let requestTYpe = '';
    //const storeParam = typeof storeId !== 'object' ? prependZeros(storeId) : ``

    if ( storeId > 0 ) {
      const response = await transport.get(cdnBaseUrl + prependZeros(storeId) + '_' + getRequestType(type) + '.json?v=' + getAssetVersion(14));

      return response
      /*
      const file = require('../../../static/mock/data/' + prependZeros(storeId) + '_' + getRequestType(type));

      return { data: file, error: '' }
      */
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
          /*
          const storeFile = require('../../../static/mock/data/stores.json');

          return { data: storeFile, error: '' }
          */
          const response = await transport.get(cdnBaseUrl + 'stores.json?v=' + getAssetVersion(12));

          return response
        } else {
          if (type === 'doctors' || type === 'rooms') {
            return { data: [], error: ''}
          }
        }
      } else {
        /*
        const response = await transport.get(cdnBaseUrl + prependZeros(storeId) + '_' + getRequestType(type) + '.json');

        return response
        */
      }

      return { data: [], error: ''}
    }
  } catch(e) {

  }
}

const getAvailableTime = async (transport: any, storeId: number, startInterval: any) => {
  try {    
    const storeParam = typeof storeId !== 'object' ? `?StoreNumber=${prependZeros(storeId)}` : `?StoreNumber=`
    const finalEndpoint: string = `${BASE_ENDPOINTS.NOBLE_ZEUS_URL}/${BASE_ENDPOINTS.FIVE9}/${getRequestType(`doctorAvailability`)}${storeParam}${getRangePeriod(startInterval)}`
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

const getRangePeriod = (startInterval: Date) => {
  const y = startInterval.getFullYear()
  const m = startInterval.getMonth()
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0)

  return `&FromDate=${formatDate(firstDay)} 00:00:00&ToDate=${formatDate(lastDay)} 23:59:59`
}

const formatDate = (date: Date) => {
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  const year = d.getFullYear()
  let day = '' + d.getDate()
  
  if (month.length < 2) 
    month = '0' + month
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-')
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
    case 'doctorAvailability': {
      return ENDPOINTS.DOCTORAVAILABILITY
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

export { getEndpointData, getLocationFromZip, getCachedData, getAvailableTime }
