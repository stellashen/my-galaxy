import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";

const SEARCH_REPOS = gql`
  query Search($keyword: String) {
    search(query: $keyword, type: REPOSITORY, first: 50) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            descriptionHTML
            stargazers {
              totalCount
            }
            forkCount
            updatedAt
          }
        }
      }
    }
  }
`;

const Explore = () => <div>Coming soon!</div>;

export default Radium(Explore);
