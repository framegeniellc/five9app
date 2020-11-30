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

const getStoreScript = (IVR: string, store: any) => {
    switch(IVR) {
        case '2.2': { return getExamOptionScript(store) }
        case '2.1.3.1': { return getDefaultScript(store) }
    }

    return ``
}

const getExamOptionScript = (store: any) => {
    return `Thank you for calling ${store.BrandName} in ${store.StoreName.replace(store.BrandName + ' - ', '')}. My name is ______. How can I help you in filling your prescription today?`
}

const getDefaultScript = (store: any) => {
    const storeId = parseInt(store.StoreNumber)
    const specialStores = [58, 77, 71 ]
    const modestoStores = [5, 7015]
    let streetName = ''

    if (specialStores.indexOf(storeId) > -1) {
        return `Thank you for calling ${store.StateName} Physicians Eyecare Group in ${store.StoreName.replace(store.BrandName + ' - ', '')}. My name is ________. How may I address your call?`
    }

    if (modestoStores.indexOf(storeId) > -1 && storeId == 5) {
        streetName = `Sisk Road`
    }

    if (modestoStores.indexOf(storeId) > -1 && storeId == 7015) {
        streetName = `Sylvan Ave`
    }

    
    if (modestoStores.indexOf(storeId) > -1) {
        return `Thank you for calling ${store.BrandName} at ${streetName}, ${store.CITY}. My name is _______, are you calling to book your eye exam today?`
    }

    return `Thank you for calling ${store.BrandName} in ${store.StoreName.replace(store.BrandName + ' - ', '')}. My name is ______. Are you calling to schedule/book your eye exam today?`
}

export { getNearestStores, getStoreScript, formatPhoneNumber }
