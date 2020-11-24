import * as React from "react"
import css from './Error.module.scss'

interface IError {
    error: string
}

export enum ERROR_MESSAGE {
    TRY_AGAIN = 'There was a problem, please try again',
    SOMETHING_HAPPENED = 'Something happened.',
    NOT_FOUND_STORE = 'Store was not provided or does not exists'
}

const getErrorMessage = (error: string) => {
    switch(error) {
        case 'try_again': {
            return ERROR_MESSAGE.TRY_AGAIN
        }
        case 'something_happened': {
            return ERROR_MESSAGE.SOMETHING_HAPPENED
        }
        case '404': {
            return ERROR_MESSAGE.NOT_FOUND_STORE
        }
    }

    return ERROR_MESSAGE.SOMETHING_HAPPENED
}

const reload = () => {
    location.href = '/'
}

const Error = (props: IError) => {

    const { error } = props

    return (
        <React.Fragment>
            <div className={css.errorContainer}>
                <div className={css.content}>
                    <i className={`${css.icon} fas fa-exclamation-triangle`}></i>
                    <h3 className={css.text}>{getErrorMessage(error)}</h3>
                    <a className={css.button} onClick={reload}>Reload</a>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Error
