import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";
import ErrorMessage from "../shared/error_message";

const GET_STARS = gql`
  query Stars($afterCursor: String) {
    viewer {
      starredRepositories(
        first: 10
        after: $afterCursor
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        edges {
          cursor
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

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    viewer: {
      ...previousResult.viewer,
      starredRepositories: {
        ...previousResult.viewer.starredRepositories,
        ...fetchMoreResult.viewer.starredRepositories,
        edges: [
          ...previousResult.viewer.starredRepositories.edges,
          ...fetchMoreResult.viewer.starredRepositories.edges
        ]
      }
    }
  };
};

const Stars = () => (
  <Query query={GET_STARS}>
    {({ data: { viewer }, loading, error, fetchMore }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      if (loading || !viewer) {
        return <Loading />;
      }

      const starredRepositories = viewer.starredRepositories;

      const totalCount = starredRepositories.totalCount;

      const stars = starredRepositories.edges.map((star, idx) => (
        <li key={`${idx}${star.cursor}`}>
          {star.node.owner.login} /{" "}
          <p style={styles.strong}>{star.node.name}</p>
        </li>
      ));

      return (
        <div>
          <span>You have starred {totalCount} repositories.</span>
          <ul>{stars}</ul>
          {starredRepositories.pageInfo.hasNextPage && (
            <button
              type="button"
              onClick={() =>
                fetchMore({
                  variables: {
                    afterCursor: starredRepositories.pageInfo.endCursor
                  },
                  updateQuery
                })
              }
            >
              More
            </button>
          )}
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
