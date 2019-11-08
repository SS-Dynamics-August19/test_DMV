import Dispatcher from "../Dispatcher/AppDispatcher";
import axios from "axios";

//***ACTIONS PERFORMED BY CUSTOMER COMPONENTS***\\
export const VehicleActions = {
  getFullList: function() {
    Dispatcher.dispatch({
      actionType: "gathering_vehicle_list"
    });
    axios
      .get("http://localhost:44322/api/People/GetAll?") //http://tc-dmv.azurewebsites.net
      .then(res => {
        Dispatcher.dispatch({
          actionType: "vehicle_list_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "vehicle_list_failed"
        });
      });
  },
  createVehicle: function(person) {
    Dispatcher.dispatch({
      actionType: "creating_vehicle"
    });
    axios
      .post(
        `https://localhost:44322/api/People/Create?newFN=${person.firstname}&newLN=${person.lastname}&newBDAY=${person.bday}&newSSN=${person.ssn}&newEMAIL=${person.email}&newSTREET1=${person.street1}&newSTREET2=${person.street2}&newCITY=${person.city}&newSTATE=${person.state}&newZIP=${person.zip}`
      )
      .then(res => {
        Dispatcher.dispatch({
          actionType: "create_vehicle_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "create_vehicle_failed"
        });
      });
  },
  updateVehicle: function(person) {
    Dispatcher.dispatch({
      actionType: "updating_vehicle"
    });
    axios
      .post(
        `https://localhost:44322/api/People/Create?newFN=${person.firstname}&newLN=${person.lastname}&newBDAY=${person.bday}&newSSN=${person.ssn}&newEMAIL=${person.email}&newSTREET1=${person.street1}&newSTREET2=${person.street2}&newCITY=${person.city}&newSTATE=${person.state}&newZIP=${person.zip}`
      )
      .then(res => {
        Dispatcher.dispatch({
          actionType: "update_vehicle_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "update_vehicle_failed"
        });
      });
  },
  deleteVehicle: function(person) {
    Dispatcher.dispatch({
      actionType: "deleting_vehicle"
    });
    axios
      .post(
        `https://localhost:44322/api/People/Create?newFN=${person.firstname}&newLN=${person.lastname}&newBDAY=${person.bday}&newSSN=${person.ssn}&newEMAIL=${person.email}&newSTREET1=${person.street1}&newSTREET2=${person.street2}&newCITY=${person.city}&newSTATE=${person.state}&newZIP=${person.zip}`
      )
      .then(res => {
        Dispatcher.dispatch({
          actionType: "delete_vehicle_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "delete_vehicle_failed"
        });
      });
  }
};

