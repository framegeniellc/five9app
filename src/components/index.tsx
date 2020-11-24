import * as React from "react";
import * as ReactDOM from "react-dom";
import '../../static/main.css'
import Layout from './Layout/Layout'


function App() {
  return (
  <React.Fragment>
    <Layout></Layout>
  </React.Fragment>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("app")
);


