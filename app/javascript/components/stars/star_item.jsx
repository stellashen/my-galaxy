import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Button from "../shared/button";
import Topics from "../shared/topics";

const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

class StarItem extends React.Component {
  constructor(props) {
    super(props);
  }

  renderReminder(star) {
    return (
      <div>
        <small>
          Sorry, you can't unstar it here, because the '
          <strong>{star.node.owner.login}</strong>' organization has enabled
          OAuth App access restrictions, meaning that data access to
          third-parties is limited.
        </small>
        <small>
          To unstar this repository, please go to{" "}
          <h5>
            <a href={star.node.url} target="_blank">
              {star.node.url}
            </a>
          </h5>
        </small>
      </div>
    );
  }

  render() {
    const star = this.props.star;
    const language = star.node.primaryLanguage;
    if (!language) return null;
    if (!star.node.viewerHasStarred) return null;
    const topics = star.node.repositoryTopics.edges.map(
      topicNode => topicNode.node.topic.name
    );
    return (
      <div style={styles.base}>
        <Mutation mutation={UNSTAR_REPOSITORY} variables={{ id: star.node.id }}>
          {(removeStar, { error }) => {
            let reminder;
            if (error) {
              reminder = true;
            }
            return (
              <div>
                {reminder ? this.renderReminder(star) : ""}
                <span style={styles.row}>
                  <div onClick={removeStar}>
                    <Button kind="primary">
                      <i className="fas fa-star" style={styles.starred} />
                      Unstar
                    </Button>
                  </div>
                  <a href={star.node.url} target="_blank">
                    <h1>
                      {star.node.owner.login} /{" "}
                      <strong>{star.node.name}</strong>
                    </h1>
                  </a>
                </span>
              </div>
            );
          }}
        </Mutation>
        <span>Starred on {star.starredAt.split("T")[0]}</span>
        <span>{star.node.description}</span>
        <span>
          <div
            style={[styles.circle, { backgroundColor: `${language.color}` }]}
          />
          {language.name}
        </span>
        <Topics>{topics}</Topics>
      </div>
    );
  }
}

const styles = {
  base: {
    border: "1px solid #d1d5da",
    borderRadius: "3px",
    padding: "16px",
    marginBottom: "10px"
  },
  row: {
    display: "flex",
    alignItems: "baseline"
  },
  circle: {
    position: "relative",
    display: "inline-block",
    top: "1px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: "5px"
  },
  starred: {
    color: "#FECD34"
  }
};

export default Radium(StarItem);
