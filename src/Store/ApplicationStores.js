import Dispatcher from "../Dispatcher/AppDispatcher";
import { EventEmitter } from "events";

const CHANGE = "change";
//*********FOR PEOPLE COMPONENT*********\\
let _applications = {
  allApplications: {
    data: [],
    pending: false,
    success: false,
    failure: false
  },
  creationStatus: {
    id: "",
    pending: false,
    success: false,
    failure: false
  },
  updateStatus: {
    pending: false,
    success: false,
    failure: false
  },
  deleteStatus: {
    pending: false,
    success: false,
    failure: false
  },
  error: ""
};
class StoreForApplications extends EventEmitter {
  addChangeListener(cb) {
    this.on(CHANGE, cb);
  }
  removeChangeListener(cb) {
    this.removeListener(CHANGE, cb);
  }
  emitChange() {
    this.emit(CHANGE);
  }
  getData() {
    return _applications;
  }

  resetReadState(section) {
    section.pending = false;
    section.success = false;
    section.failure = false;
  }
}
export const ForApplications = new StoreForApplications();
//*****************END*************************\\

Dispatcher.register(action => {
  //***ACTIONS FOR CUSTOMER COMPONENT***\\
  switch (action.actionType) {
    //***ACTIONS FOR RETRIEVING***\\
    case "application_list_success":
      ForApplications.resetReadState(_applications.allApplications);
      _applications.allApplications.data = action.data;
      _applications.allApplications.success = true;
      ForApplications.emitChange();
      break;
    case "application_list_failed":
      ForApplications.resetReadState(_applications.allApplications);
      _applications.allApplications.failure = true;
      ForApplications.emitChange();
      break;
    case "gathering_application_list":
      ForApplications.resetReadState(_applications.allApplications);
      _applications.allApplications.pending = true;
      ForApplications.emitChange();
      break;

    //***ACTIONS FOR CREATING***\\
    case "create_application_success":
      ForApplications.resetReadState(_applications.creationStatus);
      _applications.creationStatus.id = action.data;
      _applications.creationStatus.success = true;
      ForApplications.emitChange();
      break;
    case "create_application_failed":
      ForApplications.resetReadState(_applications.creationStatus);
      _applications.creationStatus.failure = true;
      ForApplications.emitChange();
      break;
    case "creating_application":
      ForApplications.resetReadState(_applications.creationStatus);
      _applications.creationStatus.pending = true;
      ForApplications.emitChange();
      break;

    //***ACTIONS FOR UPDATING***\\
    case "update_application_success":
      ForApplications.resetReadState(_applications.updateStatus);
      _applications.updateStatus.success = true;
      ForApplications.emitChange();
      break;
    case "update_application_failed":
      ForApplications.resetReadState(_applications.updateStatus);
      _applications.updateStatus.failure = true;
      ForApplications.emitChange();
      break;
    case "updating_application":
      ForApplications.resetReadState(_applications.updateStatus);
      _applications.updateStatus.pending = true;
      ForApplications.emitChange();
      break;

    //***ACTIONS FOR DELETING***\\
    case "delete_application_success":
      ForApplications.resetReadState(_applications.deleteStatus);
      _applications.deleteStatus.success = true;
      ForApplications.emitChange();
      break;
    case "delete_application_failed":
      ForApplications.resetReadState(_applications.deleteStatus);
      _applications.deleteStatus.failure = true;
      ForApplications.emitChange();
      break;
    case "deleting_application":
      ForApplications.resetReadState(_applications.deleteStatus);
      _applications.deleteStatus.pending = true;
      ForApplications.emitChange();
      break;

    //***NOTHING'S HAPPENING***\\
    default:
      return;
  }
});
