import * as React from 'react'
import { IDoctor } from '../../../interfaces/global'

const Doctor = (props: any) => {
    const { doctorInfo } = props

    return (
        <div>
            <div>{doctorInfo.FirstName} {doctorInfo.LastName}</div>
            <div>{doctorInfo.Comments && (<p>{doctorInfo.Comments}</p>)}</div>
        </div>
    )
}

export default Doctor
