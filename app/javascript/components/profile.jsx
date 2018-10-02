import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "./loading";

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
    {({ data, loading }) => {
      const { viewer } = data;

      if (loading || !viewer) {
        return <Loading />;
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
