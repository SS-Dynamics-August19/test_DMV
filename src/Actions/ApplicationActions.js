import Dispatcher from "../Dispatcher/AppDispatcher";
import axios from "axios";

//***ACTIONS PERFORMED BY CUSTOMER COMPONENTS***\\
export const ApplicationActions = {
  getFullList: function() {
    Dispatcher.dispatch({
      actionType: "gathering_application_list"
    });
    axios
      .get("http://localhost:44322/api/People/GetAll?") //http://tc-dmv.azurewebsites.net
      .then(res => {
        Dispatcher.dispatch({
          actionType: "application_list_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "application_list_failed"
        });
      });
  },
  createApplication: function(person) {
    Dispatcher.dispatch({
      actionType: "creating_application"
    });
    axios
      .post(
        `https://localhost:44322/api/People/Create?newFN=${person.firstname}&newLN=${person.lastname}&newBDAY=${person.bday}&newSSN=${person.ssn}&newEMAIL=${person.email}&newSTREET1=${person.street1}&newSTREET2=${person.street2}&newCITY=${person.city}&newSTATE=${person.state}&newZIP=${person.zip}`
      )
      .then(res => {
        Dispatcher.dispatch({
          actionType: "create_application_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "create_application_failed"
        });
      });
  },
  updateApplication: function(person) {
    Dispatcher.dispatch({
      actionType: "updating_application"
    });
    axios
      .post(
        `https://localhost:44322/api/People/Create?newFN=${person.firstname}&newLN=${person.lastname}&newBDAY=${person.bday}&newSSN=${person.ssn}&newEMAIL=${person.email}&newSTREET1=${person.street1}&newSTREET2=${person.street2}&newCITY=${person.city}&newSTATE=${person.state}&newZIP=${person.zip}`
      )
      .then(res => {
        Dispatcher.dispatch({
          actionType: "update_application_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "update_application_failed"
        });
      });
  },
  deleteApplication: function(person) {
    Dispatcher.dispatch({
      actionType: "deleting_application"
    });
    axios
      .post(
        `https://localhost:44322/api/People/Create?newFN=${person.firstname}&newLN=${person.lastname}&newBDAY=${person.bday}&newSSN=${person.ssn}&newEMAIL=${person.email}&newSTREET1=${person.street1}&newSTREET2=${person.street2}&newCITY=${person.city}&newSTATE=${person.state}&newZIP=${person.zip}`
      )
      .then(res => {
        Dispatcher.dispatch({
          actionType: "delete_application_success",
          data: res.data
        });
      })
      .catch(e => {
        console.log(e);
        Dispatcher.dispatch({
          actionType: "delete_application_failed"
        });
      });
  }
};
