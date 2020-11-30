import { getConfig } from './index'
import Geocode from 'react-geocode'
import { getNearestStores } from '../../components/CustomerAcquisition/Common/store'
import getDefaultTransport, { ENDPOINTS as BASE_ENDPOINTS } from '../api/defaultInterceptor'

const ENDPOINTS = {
    TOKEN: `/Account/Login`,
    PROMOTIONS: `GetStorePromotions`,
    NOTESALERTS: `GetStoreSpecialNotesAlerts`,
    STORE: `GetStoreInformationV2`,
    DOCTOR: `GetStoreDoctorComments`,
    ROOMS: `GetStoreExamRooms`,
}

const acceptedStatusCodes = [200, 201]

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
  })
}

export { getEndpointData, getLocationFromZip }
