import { getConfig } from './index'
import { ITransport } from '../interfaces'
import getDefaultTransport, { ENDPOINTS as BASE_ENDPOINTS } from '../api/defaultInterceptor'

const ENDPOINTS = {
    TOKEN: `/Account/Login`,
    PROMOTIONS: `GetStorePromotions?StoreNumber=`,
    NOTESALERTS: `GetStoreSpecialNotesAlerts?StoreNumber=`,
    STORE: `GetStoreInformation?StoreNumber=`,
    DOCTOR: `GetStoreDoctorComments?StoreNumbe?StoreNumber=`,
}

const acceptedStatusCodes = [200, 201]

const getStorePromotions = async (transport: ITransport, token: string) => {
    try {
        const finalEndpoint: string = `${BASE_ENDPOINTS.FIVE9}/${ENDPOINTS.PROMOTIONS}`
        const response = await transport.get(finalEndpoint, getConfig(token))
        
        if (response.error || response.data.error) {
          return { error: response.error || response.data.error, data: '' }
        }
        
        if (response.data.StatusCode && !acceptedStatusCodes.includes(response.data.StatusCode)) {
          return { error: response.data.Message, data: '' }
        }
        
        return { error: '', data: response?.data?.Result }
    } catch (e) {
        return {
          error: e.response.data.message ? e.response.data.message : 'Unable to retrieve user',
          data: null,
        }
    }
}