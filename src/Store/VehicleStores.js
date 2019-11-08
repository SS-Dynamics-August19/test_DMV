import Dispatcher from "../Dispatcher/AppDispatcher";
import { EventEmitter } from "events";

const CHANGE = "change";
//*********FOR PEOPLE COMPONENT*********\\
let _vehicles = {
  allVehicles: {
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
class StoreForVehicles extends EventEmitter {
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
    return _vehicles;
  }
  resetReadState(section) {
    section.pending = false;
    section.success = false;
    section.failure = false;
  }
}
export const ForVehicles = new StoreForVehicles();
//*****************END*************************\\

Dispatcher.register(action => {
  //***ACTIONS FOR CUSTOMER COMPONENT***\\
  switch (action.actionType) {
    //***ACTIONS FOR RETRIEVING***\\
    case "vehicle_list_success":
      ForVehicles.resetReadState(_vehicles.allVehicles);
      _vehicles.allVehicles.data = action.data;
      _vehicles.allVehicles.success = true;
      ForVehicles.emitChange();
      break;
    case "vehicle_list_failed":
      ForVehicles.resetReadState(_vehicles.allVehicles);
      _vehicles.allVehicles.failure = true;
      ForVehicles.emitChange();
      break;
    case "gathering_vehicle_list":
      ForVehicles.resetReadState(_vehicles.allVehicles);
      _vehicles.allVehicles.pending = true;
      ForVehicles.emitChange();
      break;

    //***ACTIONS FOR CREATING***\\
    case "create_vehicle_success":
      ForVehicles.resetReadState(_vehicles.creationStatus);
      _vehicles.creationStatus.id = action.data;
      _vehicles.creationStatus.success = true;
      ForVehicles.emitChange();
      break;
    case "create_vehicle_failed":
      ForVehicles.resetReadState(_vehicles.creationStatus);
      _vehicles.creationStatus.failure = true;
      ForVehicles.emitChange();
      break;
    case "creating_vehicle":
      ForVehicles.resetReadState(_vehicles.creationStatus);
      _vehicles.creationStatus.pending = true;
      ForVehicles.emitChange();
      break;

    //***ACTIONS FOR UPDATING***\\
    case "update_vehicle_success":
      ForVehicles.resetReadState(_vehicles.updateStatus);
      _vehicles.updateStatus.success = true;
      ForVehicles.emitChange();
      break;
    case "update_vehicle_failed":
      ForVehicles.resetReadState(_vehicles.updateStatus);
      _vehicles.updateStatus.failure = true;
      ForVehicles.emitChange();
      break;
    case "updating_vehicle":
      ForVehicles.resetReadState(_vehicles.updateStatus);
      _vehicles.updateStatus.pending = true;
      ForVehicles.emitChange();
      break;

    //***ACTIONS FOR DELETING***\\
    case "delete_vehicle_success":
      ForVehicles.resetReadState(_vehicles.deleteStatus);
      _vehicles.deleteStatus.success = true;
      ForVehicles.emitChange();
      break;
    case "delete_vehicle_failed":
      ForVehicles.resetReadState(_vehicles.deleteStatus);
      _vehicles.deleteStatus.failure = true;
      ForVehicles.emitChange();
      break;
    case "deleting_vehicle":
      ForVehicles.resetReadState(_vehicles.deleteStatus);
      _vehicles.deleteStatus.pending = true;
      ForVehicles.emitChange();
      break;

    //***NOTHING'S HAPPENING***\\
    default:
      return;
  }
});
