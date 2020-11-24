export interface IGlobalProps {
    interceptor: any
    storeId?: number
}

export interface IStore {
    StoreNumber: string
    Address: string
    StateName: string
    City: string
    ZipCode: string    
}

export interface IStoreLoad {
    store?: any
    loading?: boolean
}

export interface IOpeningScript extends IStoreLoad {
    openingText: string
}

export interface IStoreDetails extends IStoreLoad {
    text: string
}

export interface ISchedule {
    schedule: any
}
