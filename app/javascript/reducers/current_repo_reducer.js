import { CLOSE_REPO, RECEIVE_REPO } from "../actions/repo_actions";

const currentRepoReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_REPO:
      return action.repoInfo;
    case CLOSE_REPO:
      return null;
    default:
      return state;
  }
};

export default currentRepoReducer;
