import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
      url
    }
  }
`;

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data }) => {
      const { viewer } = data;

      if (!viewer) {
        return null;
      }

      return (
        <div>
          {viewer.name} {viewer.login} {viewer.url}
        </div>
      );
    }}
  </Query>
);

export default Profile;
