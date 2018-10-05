import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";
import ErrorMessage from "../shared/error_message";
import StarList from "./star_list";
import Button from "../shared/button";

const GET_STARS = gql`
  query Stars($afterCursor: String) {
    viewer {
      starredRepositories(
        first: 50
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

      return (
        <div style={styles.base}>
          <span style={styles.header}>
            You have starred <strong>{totalCount}</strong> repositories.
          </span>
          <StarList stars={starredRepositories.edges} />
          {starredRepositories.pageInfo.hasNextPage && (
            <Button
              kind="primary"
              onClick={() =>
                fetchMore({
                  variables: {
                    afterCursor: starredRepositories.pageInfo.endCursor
                  },
                  updateQuery
                })
              }
            >
              Load More
            </Button>
          )}
        </div>
      );
    }}
  </Query>
);

const styles = {
  base: {
    padding: "20px"
  },
  header: {
    fontSize: "16px"
  }
};

export default Radium(Stars);
