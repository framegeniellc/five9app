import * as React from "react"
import css from './Error.module.scss'

interface IError {
    error: string
}

export enum ERROR_TYPE {
    TRY_AGAIN = 'TRY_AGAIN',
    SOMETHING_HAPPENED = 'SOMETHING_HAPPENED',
}

export enum ERROR_MESSAGE {
    TRY_AGAIN = 'There was a problem, please try again',
    SOMETHING_HAPPENED = 'Something happened.',
}

const reload = () => {
    location.href = '/'
}

const Error = (props: IError) => {

    const { error } = props

    return (
        error === ERROR_TYPE.TRY_AGAIN &&
        <React.Fragment>
            <div className={css.errorContainer}>
                <div className={css.content}>
                    <i className={`${css.icon} fas fa-exclamation-triangle`}></i>
                    <h3 className={css.text}>{ERROR_MESSAGE.TRY_AGAIN}</h3>
                    <a className={css.button} onClick={reload}>Reload</a>
                </div>
            </div>
        </React.Fragment>

    )
}

export default Error
