import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";
import ErrorMessage from "../shared/error_message";
import Navigation from "./navigation";
import Readme from "./readme";
import NoRepo from "./no_repo";

const GET_README = gql`
  query Readme($repoOwner: String!, $repoName: String!) {
    repository(owner: $repoOwner, name: $repoName) {
      sshUrl
      url
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
    if (!this.props.currentRepo) return <NoRepo />;
    const { repoOwner, repoName } = this.props.currentRepo;
    return (
      <Query
        query={GET_README}
        variables={{
          repoOwner,
          repoName
        }}
      >
        {({ data: { repository }, loading, error }) => {
          if (error) {
            return <ErrorMessage error={error} />;
          }

          if (loading || !repository) {
            return <Loading />;
          }

          return (
            <div>
              <Navigation sshUrl={repository.sshUrl} />
              <div className="Box-header px-2 clearfix">
                <span className="Box-title pr-3">
                  <svg
                    className="octicon octicon-book"
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"
                    />
                  </svg>{" "}
                  README.md
                </span>
              </div>
              <Readme repository={repository} />
            </div>
          );
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
