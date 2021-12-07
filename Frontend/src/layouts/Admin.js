
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";

import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "routes.js";
import Dashboard from "views/Dashboard.js";
import UserPage from "views/User.js";
import AddUser from "views/AddUser.js";
import TreatmentDiagnosis from "views/TreatmentDiagnosis.js";
import SetAppointment from "views/SetAppointment";
import HistoricalData from "views/HistoricalData";


var ps;

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <Switch>
            <Route
              path="/admin/dashboard"
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path="/admin/user-page"
              render={(props) => <UserPage userData={this.props.userData} {...props} />}
            />
            <Route
              path="/admin/adduser"
              render={(props) => <AddUser userData={this.props.userData} {...props} />}
            />
            <Route
              path="/admin/TreatmentDiagnosis"
              render={(props) => <TreatmentDiagnosis userData={this.props.userData} {...props} />}
            />
            <Route
              path="/admin/SetAppointment"
              render={(props) => <SetAppointment userData={this.props.userData} {...props} />}
            />
            <Route
              path="/admin/history"
              render={(props) => <HistoricalData userData={this.props.userData} {...props} />}
            />
            {/* {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })} */}
          </Switch>
        </div>

      </div>
    );
  }
}

export default Admin;
