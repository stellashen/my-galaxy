import { connect } from "react-redux";
import { receiveRepo, closeRepo } from "../../actions/repo_actions";
import StarItem from "./star_item";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const currentRepo = state.ui.currentRepo;
  return {
    currentRepo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    receiveRepo: repoInfo => dispatch(receiveRepo(repoInfo)),
    closeRepo: () => dispatch(closeRepo())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StarItem)
);
