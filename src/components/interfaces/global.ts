export interface IGlobalProps {
    interceptor: any
    storeId?: number
    IVR?: string
    language?: string
    skill?: string
    brand?: string
    setErrorMessage?: any
    option?: string
    callID?: string
    setTimezone?: (time: any) => void
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
    setTimezone?: (time: any) => void
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
    specialStore?: boolean
    callID?: string
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

export interface IMenu {
    option: any
    timezone?: string
    setOption?: (option: any) => void
}

export interface IDoctorSchedule {
    ADPId?: any
    FirstName?: string
    LastName?: string 
    Title?: string
    WorkDate?: string
}