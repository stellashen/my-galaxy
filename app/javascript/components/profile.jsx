import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "./shared/loading";
import ErrorMessage from "./shared/error_message";

const GET_CURRENT_USER = gql`
  {
    viewer {
      name
      login
      url
      avatarUrl
      starredRepositories(
        first: 100
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        edges {
          cursor
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
        <li key={`${star.cursor}`}>
          {star.node.owner.login} / {star.node.name}
        </li>
      ));

      const starsPageUrl = `${viewer.url}?tabs=stars`;

      return (
        <div>
          <div style={[styles.navbar, styles.center]}>
            <img
              src="https://res.cloudinary.com/devleg/image/upload/v1538468776/white_logo_transparent_background.png"
              style={styles.logo}
            />
            <a href={starsPageUrl} target="_blank">
              <img src={viewer.avatarUrl} style={styles.avatar} />
            </a>
            <div style={styles.name}>
              Signed in as <p style={styles.strong}>{viewer.login}</p>
            </div>
          </div>
          <div>{stars}</div>
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
    fontSize: "11px"
  },
  center: {
    textAlign: "center",
    verticalAlign: "middle",
    alignItems: "center",
    display: "flex"
  },
  logo: {
    width: "200px"
  },
  avatar: {
    height: "50px",
    position: "absolute",
    top: "5px",
    right: "20px"
  },
  name: {
    position: "absolute",
    top: "10px",
    right: "100px"
  },
  strong: {
    fontWeight: "900",
    display: "inline"
  }
};

export default Radium(Profile);
