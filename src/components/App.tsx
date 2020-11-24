import * as React from 'react'
import Layout from './Layout/Layout'

interface IProps {
    interceptor: any
}

interface IState {
    store: number
}

export default class App extends React.Component<IProps, IState> {
    private getStoreFromUri = () => {
        const urlParams = new URLSearchParams(window?.location.search)

        return Number(urlParams.get('StoreID')) || 0
    }

    render() {
        return (
            <React.Fragment>
                <Layout interceptor={this.props.interceptor} storeId={this.getStoreFromUri()} />
            </React.Fragment>
        )
    }
}
