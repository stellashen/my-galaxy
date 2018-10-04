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
        first: 50
        after: $afterCursor
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        totalCount
        pageInfo {
          startCursor
          hasPreviousPage
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

const Stars = () => (
  <Query
    query={GET_STARS}
    variables={{
      afterCursor: "Y3Vyc29yOnYyOpK5MjAxOC0wNS0wN1QyMjozNjoyMy0wNzowMM4HZ3lC"
    }}
  >
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
        <li key={`${idx}${star.cursor}`}>
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
