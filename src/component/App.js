"use strict";

import React from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./Constant/Home";
import { Header } from "./Constant/Header";
import { CreateApplication } from "./Create/CreateApplication";
import { ForCustomers } from "../Store/CustomerStores";
import { CreateCustomer } from "./Create/CreateCustomer";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: {},
      customers: {},
      vehicles: {}
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Switch />
        <Route exact path="/" component={Home} />
        <Route
          path="/Applications"
          render={props => (
            <CreateApplication {...props} applicationsData={this.state.applications} />
          )}
        />
        <Route
          path="/Customers"
          render={props => (
            <CreateCustomer {...props} customersData={this.state.customers} />
          )}
        />
        <Route
          path="/Vehicles"
          render={props => (
            <CreateVehicle {...props} vehiclesData={this.state.vehicles} />
          )}
        />
        <Switch />
      </div>
    );
  }

  componentDidMount() {
    ApplicationStore.addChangeListener(this._getApplicationData.bind(this));
    CustomerStore.addChangeListener(this._getCustomerData.bind(this));
    VehicleStore.addChangeListener(this._getVehicleData.bind(this));
  }

  componentWillUnmount() {
    ApplicationStore.removeChangeListener(this._getApplicationData.bind(this));
    CustomerStore.removeChangeListener(this._getCustomerData.bind(this));
    VehicleStore.removeChangeListener(this._getVehicleData.bind(this));
  }

  _getCustomerData() {
    this.setState({ customers: ForCustomers.getData() });
  }
  _getVehicleData() {
    this.setState({ vehicles: ForVehicles.getData() });
  }
  _getApplicationData() {
    this.setState({ applications: ForApplications.getData() });
  }
}
