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

      return (
        <div>
          {viewer.name} {viewer.login} {viewer.url}
        </div>
      );
    }}
  </Query>
);

export default Profile;
