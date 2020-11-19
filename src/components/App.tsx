import * as React from 'react'
import Offers from './Offers/Offers'

interface IProps {
    interceptor: any
}

interface IState {
    store: number
}

export default class App extends React.Component<IProps, IState> {
    componentDidMount = () => {
        this.setState({ store: 20 }, () => { console.log('store', this.state.store) })
    }

    render() {
        return (
            <React.Fragment>
                <Offers interceptor={this.props.interceptor} storeId={111} />
            </React.Fragment>
        )
    }
}
