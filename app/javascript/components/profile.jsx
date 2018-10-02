import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "./shared/loading";
import ErrorMessage from "./shared/error_message";

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
      url
      starredRepositories(last: 3) {
        edges {
          cursor
          node {
            id
            name
            owner {
              id
              avatarUrl
              login
            }
            url
            updatedAt
          }
        }
      }
    }
  }
`;

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
      }

      const stars = viewer.starredRepositories.edges.map((star, idx) => (
        <li key={`${star.cursor}`}>{star.node.name}</li>
      ));

      return (
        <div>
          {viewer.name} {viewer.login} {viewer.url} {stars}
        </div>
      );
    }}
  </Query>
);

export default Profile;
