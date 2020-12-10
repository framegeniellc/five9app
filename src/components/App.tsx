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

    private getIvrFromUri = () => {
        const urlParams = new URLSearchParams(window?.location.search)

        return urlParams.get("IVR") || null
    }


    private getBrandFromUri = () => {
        const urlParams = new URLSearchParams(window?.location.search)

        return urlParams.get("Brand") || null
    }


    private getSkillFromUri = () => {
        const urlParams = new URLSearchParams(window?.location.search)

        return urlParams.get("Skill") || null
    }


    private getLanguageFromUri = () => {
        const urlParams = new URLSearchParams(window?.location.search)

        return urlParams.get("Language") || null
    }

    render() {
        return (
            <React.Fragment>
                <Layout interceptor={this.props.interceptor} storeId={this.getStoreFromUri()} IVR={this.getIvrFromUri()} language={this.getLanguageFromUri()} brand={this.getBrandFromUri()} skill={this.getSkillFromUri()}  />
            </React.Fragment>
        )
    }
}
