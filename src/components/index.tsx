import * as React from "react";
import * as ReactDOM from "react-dom";
import '../../static/main.css'
//import '../../static/font-awesome.css'
import Menu from './Menu/Menu'
import CustomerAcquisition from './CustomerAcquisition/CustomerAcquisition'


ReactDOM.render(
  <React.Fragment>
    <div className={'content'}>
        <div className={'menuContainer'}>
          <Menu></Menu>
        </div>
        <div className={'viewContainer'}>
          <CustomerAcquisition></CustomerAcquisition>
        </div>
    </div>
  </React.Fragment>,
  document.getElementById("app")
);


