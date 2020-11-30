import * as React from 'react'

const StoreItem = (props: any) => {
    const { store, setSelectedStoreId, setGeoResponse } = props

    return (
        <div>
            <div><strong
                ><a href={``} 
                onClick={
                    (evt: any) => { 
                        evt.preventDefault()
                        setSelectedStoreId(Number(store['Store ID']))
                        setGeoResponse(null)
                    }
                }>
                    {store['Store Name']}
                </a>
            </strong></div>
        </div>
    )
}

export default StoreItem
