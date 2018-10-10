import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";
import ErrorMessage from "../shared/error_message";

const GET_README = gql`
  query Readme($repoOwner: String!, $repoName: String!) {
    repository(owner: $repoOwner, name: $repoName) {
      object(expression: "master:README.md") {
        ... on Blob {
          text
        }
      }
    }
  }
`;

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <Query
        query={GET_README}
        variables={{
          repoOwner: this.props.repoOwner,
          repoName: this.props.repoName
        }}
      >
        {({ data: { repository }, loading, error }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }

          if (loading || !repository) {
            return <Loading />;
          }

          return <div style={styles.base}>{repository.object.text}</div>;
        }}
      </Query>
    );
  }
}

const styles = {
  base: {
    padding: "20px"
  }
};

export default Radium(Detail);
