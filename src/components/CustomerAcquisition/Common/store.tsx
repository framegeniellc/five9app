import { IOpeningScript } from '../../interfaces/global'
import getTranslation from '../../../utils/translations/translationUtils'
import { EStoreBrand } from '../SearchBox/SearchBox'

const formatPhoneNumber = (phone: string) => {
    let cleaned = ('' + phone).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    
    return null
}

const getNearestStores = (geoData: any, stores: any) => {
    const { lat, lng } = geoData.results[0].geometry.location

    stores.sort((a: any, b: any) => {
        const distanceA = getDistanceToStore(Number(lat), Number(lng), Number(a.Latitude), Number(a.Longitude))
        const distanceB = getDistanceToStore(Number(lat), Number(lng), Number(b.Latitude), Number(b.Longitude))

        return distanceA - distanceB
    })

    return stores
}

const getDistanceToStore = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    var R = 6371;
    var dLat = deg2rad(lat2-lat1);
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}
  
const deg2rad = (deg: number) => {
    return deg * (Math.PI/180)
}

const getBrandName = (brand: string) => {
    return brand == 'SO' ? EStoreBrand.SO : EStoreBrand.MEL
}

const getStoreScript = (props: IOpeningScript) => {
    //store: any, lang: string, IVR: string, brand: string, skill: string, specialStore: boolean
    const { store, language, IVR, brand, skill } = props

    // If only brand, then get script according to language
    if (brand) {

        // If only Skrill and brand, then get script of IVR according to language
        if (skill == 'CA' || skill == 'CR') {
            return getSkillScript(skill, brand, language)
        }

        // If IVR is 1, then get script of IVR according to language
        if (Number(IVR) == 1) {
            return getIVRScript(brand, language)
        }

        return getBrandScript(brand, language)
    }

    // If only store, then get default script according to language
    if (store) {
        return getDefaultScript(store, language)
    }

    //If storeId is a special store, then get 2nd interaction script according to language and store ID

    return 'test'
}

const getIVRScript = (brand: any, lang: string) => {
    return `${getTranslation('Thank you for calling', lang)} ${getTranslation('in', lang)} ${getBrandName(brand)}, ${getTranslation('my name is', lang)} _______. ${getTranslation('How can I help you in filling your prescription today?', lang)}`
}

const getSkillScript = (skill: string, brand: string, lang: string ) => {
    return `${getTranslation('Thank you for calling', lang)} ${getBrandName(brand)}, ${getTranslation('my name is', lang)} _______. ${getTranslation('May I have your first and last name?', lang)}`
}

const getBrandScript = (brand: string, lang: string ) => {
    return `${getTranslation('Thank you for calling', lang)} ${getBrandName(brand)}, ${getTranslation('to better assist you can I please have your zip code?', lang)}`
}

const getDefaultScript = (store: any, lang: string) => {
   return `${getTranslation('Thank you for calling', lang)} ${store.BrandName} ${getTranslation('at', lang)} ${store.StoreName.replace(store.BrandName + ' - ', '')}, ${getTranslation('my name is', lang)} _______, ${getTranslation('are you calling to schedule your eye exam today?', lang)}`
}

export { getNearestStores, getStoreScript, formatPhoneNumber }
