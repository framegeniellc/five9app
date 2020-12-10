export interface IGlobalProps {
    interceptor: any
    storeId?: number
    IVR?: string
    language?: string
    skill?: string
    brand?: string
}

export interface IStatesObject {
    [key: string]: string
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

export interface IStoreData extends IStoreLoad {
    doctors: any
    rooms: any
}

export interface ISearch {
    setStoreInfo: any
    setSelectedStoreId: any
    setGeoResponse: any
    stores: any
    store?: any
}

export interface IOpeningScript {
    IVR: string
    store: any
    language?: string
    skill?: string
    brand?: string
}

export interface IStoreDetails extends IStoreLoad {
    text: string
}

export interface ISpecialNotes extends IStoreLoad {
    text: string
}

export interface ISchedule {
    schedule: any
}

export interface IDoctor {
    FirstName: string
    LastName: string
    Comments: string | null
}

