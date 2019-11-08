import React from "react";
import { CreateCustomer } from "./CreateCustomer";
import { MDBBtn } from "mdbreact";
import { Lookup } from "../../oldies/Person/Lookup";
import axios from 'axios'
// import { Lookup } from "../../oldies/Person/Lookup";

export class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationType: ""
    };
    this.applicationTypeOption = this.applicationTypeOption.bind(this);
    this.applicationCurrentDisplay = this.applicationCurrentDisplay.bind(this);
    this.addressChangeDisplay = this.addressChangeDisplay.bind(this);
    this.renewLicenseDisplay = this.renewLicenseDisplay.bind(this);
    this.vehicleRegDisplay = this.vehicleRegDisplay.bind(this);
    this.newDriverDisplay = this.newDriverDisplay.bind(this);
    this.lookup = this.lookup.bind(this) 
  }


  lookup(ssn) {
    var id = "";
    const getRecord = async (ssn) => {
      // console.log(info); //log what we are requesting
      const url = `http://localhost:33244/api/People/Lookup?SSN=${ssn}`; // !ADD URL HERE! INCLUDING ID PARAM NAME (ex: 'https://domain.io/api/Controller/Method?Param='\\
      const res = await axios.get(`${url}`); //make get request
  
      const recordData = await res.data;
      id = recordData;
      console.log(record);
    };
    
    return id;    
  }

  /**
   * *Changes the application type when the value changes in the option set
   * @param event when the selection changes
   */
  applicationTypeOption(event) {
    this.setState({ applicationType: event.target.value });
  }

  /**
   * *Sets the current display
   * @param appType value from the application type option set
   */
  applicationCurrentDisplay(appType) {
    switch (appType) {
      case "address_change":
        return this.addressChangeDisplay();
      case "renew_license":
        return this.renewLicenseDisplay();
      case "vehicle_reg":
        return this.vehicleRegDisplay();
      case "new_license":
        return this.newDriverDisplay();
      default:
        return "";
    }
  }

  

  addressChangeDisplay() {
    let display = <Lookup type="customer" />;

    return display;
  }

  renewLicenseDisplay() {}
  vehicleRegDisplay() {}
  newDriverDisplay() {}

  render() {
    const appTypeSelector = (
      <div className="input-group mb-3">
        <select
          className="custom-select"
          id="appType"
          onChange={this.applicationTypeOption}
          value={this.state.applicationType}
        >
          <option defaultValue="">Choose appliction type..</option>
          <option value="vehicle_reg">Vehicle Registration</option>
          <option value="address_change">Address Change</option>
          <option value="renew_license">Renew Driver&apos;s License</option>
          <option value="new_license">New Driver&apos;s License</option>
        </select>
        <div className="input-group-append">
          <label className="input-group-text" htmlFor="appType">
            Application Type
          </label>
        </div>
      </div>
    );
    const currentDisplay = this.applicationCurrentDisplay(
      this.state.applicationType
    );

    let creator = (
      <CreateCustomer modal={false} appType={this.state.applicationType} />
    );

    return (
      <div>
        {appTypeSelector}

        <p>{this.state.applicationType}</p>
        {currentDisplay}
        {creator}
      </div>
    );
  }
}
