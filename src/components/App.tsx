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
        const search = window?.location.search.replace(/&amp;/g, '&')
        const urlParams = new URLSearchParams(search)

        return Number(urlParams.get('StoreID')) || 0
    }

    private getIvrFromUri = () => {
        const search = window?.location.search.replace(/&amp;/g, '&')
        const urlParams = new URLSearchParams(search)

        console.log(urlParams.get("IVRSelection"));

        return urlParams.get("IVRSelection") || null
    }


    private getBrandFromUri = () => {
        const search = window?.location.search.replace(/&amp;/g, '&')
        const urlParams = new URLSearchParams(search)

        return urlParams.get("Brand") || null
    }


    private getSkillFromUri = () => {
        const search = window?.location.search.replace(/&amp;/g, '&')
        const urlParams = new URLSearchParams(search)

        return urlParams.get("Skill") || null
    }


    private getLanguageFromUri = () => {
        const search = window?.location.search.replace(/&amp;/g, '&')
        const urlParams = new URLSearchParams(search)

        return urlParams.get("Language") || null
    }


    private getCallID = () => {
        const search = window?.location.search.replace(/&amp;/g, '&')
        const urlParams = new URLSearchParams(search)

        return urlParams.get("call_id") || null
    }

    render() {
        return (
            <React.Fragment>
                <Layout interceptor={this.props.interceptor} storeId={this.getStoreFromUri()} IVR={this.getIvrFromUri()} language={this.getLanguageFromUri()} brand={this.getBrandFromUri()} skill={this.getSkillFromUri()} callID={this.getCallID()}  />
            </React.Fragment>
        )
    }
}
