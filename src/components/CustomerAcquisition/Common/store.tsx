import stores from '../../../../static/mock/stores'

const getNearestStores = (geoData: any) => {
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

export { getNearestStores }