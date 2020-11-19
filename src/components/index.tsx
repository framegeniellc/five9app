import * as React from "react"
import * as ReactDOM from "react-dom"
import App from './App'

import getDefaultTransport, { ENDPOINTS } from '../services/api/defaultInterceptor'
const defaultTransport = getDefaultTransport()

ReactDOM.render(
  <div><App interceptor={defaultTransport} /></div>,
  document.getElementById("app")
);