export const RECEIVE_REPO = "RECEIVE_REPO";
export const CLOSE_REPO = "CLOSE_REPO";

export const closeRepo = () => {
  return {
    type: CLOSE_REPO
  };
};

export const receiveRepo = repoInfo => ({
  type: RECEIVE_REPO,
  repoInfo
});
