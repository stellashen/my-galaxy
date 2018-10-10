import { combineReducers } from "redux";
import currentRepoReducer from "./current_repo_reducer";

export default combineReducers({
  currentRepo: currentRepoReducer
});
