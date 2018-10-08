import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";

const SEARCH_REPOS = gql`
  query Search($keyword: String) {
    search(query: $keyword, type: REPOSITORY, first: 50) {
      repositoryCount
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
          descriptionHTML
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
          repositoryTopics(first: 20) {
            edges {
              node {
                topic {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Explore = () => <div>Coming soon!</div>;

export default Radium(Explore);
