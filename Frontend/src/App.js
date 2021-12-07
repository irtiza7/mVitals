import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";

import Login from "./views/Login.js";
import Register from "./views/Register.js";
import User from "./views/User.js";
import Tables from "./views/Tables.js";
import HistoricalData from "./views/HistoricalData.js";
import AddUser from "./views/AddUser.js";
import TreatmentDiagnosis from "./views/TreatmentDiagnosis.js";
import SetAppointment from "./views/SetAppointment.js";

import MqttService from "./services/MqttService.js";

const hist = createBrowserHistory();
export const MqttContext = React.createContext({}); //Initialise

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userData: null
    };

    this._mqttService = new MqttService();
    this.onLoginCompleteCallback = this.onLoginCompleteCallback.bind(this);
  }

  onLoginCompleteCallback(data) {
    //const userData = JSON.parse(data);
    console.log(data);
    this.setState({ userData: data, isLoggedIn: true });
  }

  render() {
    return (
      <MqttContext.Provider value={this._mqttService}>
        <Router history={hist}>
          <Switch>

            <Route path="/login" render={(props) => <Login onLoginCompleteCallback={this.onLoginCompleteCallback} {...props} />} />
            <Route path="/register" render={(props) => <Register onLoginCompleteCallback={this.onLoginCompleteCallback} {...props} />} />
            <Route path="/admin" render={(props) => <AdminLayout userData={this.state.userData} {...props} />} />
            <Route path="/userpage" render={(props) => <User userData={this.state.userData} {...props} />} />
            <Route path="/tables" render={(props) => <Tables {...props} />} />
            <Route path="/history" render={(props) => <HistoricalData {...props} />} />
            <Route path="/adduser" render={(props) => <AddUser userData={this.state.userData} {...props} />} />
            <Route path="/treatmentdiagnosis" render={(props) => <TreatmentDiagnosis {...props} />} />
            <Route path="/appointment" render={(props) => <SetAppointment {...props} />} />
            {this.state.isLoggedIn ? <Redirect to="/admin/dashboard" /> : <Redirect to="/login" />}
          </Switch>
        </Router>
      </MqttContext.Provider>
    );
  }
};

export default App;
