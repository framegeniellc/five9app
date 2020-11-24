import * as React from 'react'
import getEndpointData from '../../services/zeus/store'

interface IStore {
    interceptor: any
    storeId: number
}

const Offers = (props: IStore) => {
    const [storesPromos, setStorePromos] = React.useState<any>([])
    const [loading, setLoading] = React.useState<Boolean>(true)

    const setStoreInfo = async () => {
        const { interceptor, storeId } = props
        const store = await getEndpointData(props.interceptor, props.storeId, 'info')

        setStorePromos(store?.data)
        setLoading(false)
    }

    React.useEffect(() => {
        setStoreInfo()
    }, [])
    
    if (loading) {
        return (<div>Loading....</div>)
    }

    return (
        <React.Fragment>
            <div>This is a store component {JSON.stringify(storesPromos)}</div>
        </React.Fragment>
    )
}

export default Offers
