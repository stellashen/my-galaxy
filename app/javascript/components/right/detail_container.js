import { connect } from "react-redux";
import Detail from "./detail";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
  const currentRepo = state.ui.currentRepo;
  return {
    currentRepo
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Detail)
);
