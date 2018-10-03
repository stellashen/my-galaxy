import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";
import ErrorMessage from "../shared/error_message";

const GET_STARS = gql`
  {
    viewer {
      starredRepositories(
        first: 10
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          starredAt
          node {
            id
            name
            owner {
              id
              login
            }
            description
            url
            updatedAt
            primaryLanguage {
              id
              name
              color
            }
            stargazers {
              totalCount
            }
            forkCount
            viewerHasStarred
          }
        }
      }
    }
  }
`;

const Stars = () => (
  <Query query={GET_STARS}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      const starredRepositories = viewer.starredRepositories;

      const totalCount = starredRepositories.totalCount;

      const stars = starredRepositories.edges.map((star, idx) => (
        <li key={`${star.cursor}`}>
          {star.node.owner.login} /{" "}
          <p style={styles.strong}>{star.node.name}</p>
        </li>
      ));

      return (
        <div>
          <span>You have starred {totalCount} repositories.</span>
          <ul>{stars}</ul>
        </div>
      );
    }}
  </Query>
);

const styles = {
  strong: {
    fontWeight: "900",
    display: "inline"
  }
};

export default Radium(Stars);
