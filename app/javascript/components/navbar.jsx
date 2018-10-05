import React from "react";
import { Link } from "react-router-dom";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ErrorMessage from "./shared/error_message";

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      url
      avatarUrl
    }
  }
`;

const Navbar = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error }) => {
      if (error) {
        return <ErrorMessage error={error} />;
      }

      const { viewer } = data;

      if (loading || !viewer) {
        return null;
      }

      const starsPageUrl = `${viewer.url}?tabs=stars`;

      return (
        <div>
          <div style={[styles.navbar, styles.center]}>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/devleg/image/upload/v1538468776/white_logo_transparent_background.png"
                style={styles.logo}
              />
            </Link>
            <a href={starsPageUrl} target="_blank">
              <img src={viewer.avatarUrl} style={styles.avatar} />
            </a>
            <div style={styles.name}>
              Signed in as <strong>{viewer.login}</strong>
            </div>
          </div>
        </div>
      );
    }}
  </Query>
);

const styles = {
  navbar: {
    color: "#fff",
    background: "#000",
    fontFamily: "Open Sans, sans-serif",
    height: "60px",
    width: "100%",
    fontSize: "11px",
    position: "fixed",
    top: "0"
  },
  center: {
    textAlign: "center",
    verticalAlign: "baseline",
    alignItems: "center",
    display: "flex"
  },
  logo: {
    width: "200px",
    padding: "0 16px"
  },
  avatar: {
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "5px",
    right: "20px"
  },
  name: {
    position: "absolute",
    top: "10px",
    right: "100px"
  }
};

export default Radium(Navbar);
