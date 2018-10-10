import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import timeago from "timeago.js";
import Button from "../shared/button";
import Topics from "../shared/topics";

const REMOVE_STAR = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

const ADD_STAR = gql`
  mutation($id: ID!) {
    addStar(input: { starrableId: $id }) {
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

  renderReminder(starred, star) {
    return (
      <div>
        <small>
          Sorry, you can't {starred ? "unstar" : "star"} it here, because the '
          <strong>{star.node.owner.login}</strong>' organization has enabled
          OAuth App access restrictions, meaning that data access to
          third-parties is limited.
        </small>
        <small>
          To {starred ? "unstar" : "star"} this repository, please go to{" "}
          <h5>
            <a href={star.node.url} target="_blank">
              {star.node.url}
            </a>
          </h5>
        </small>
      </div>
    );
  }

  rawMarkup(star) {
    const rawMarkup = star.node.descriptionHTML;
    return { __html: rawMarkup };
  }

  renderMutation(starred, star) {
    if (starred) {
      return (
        <Mutation mutation={REMOVE_STAR} variables={{ id: star.node.id }}>
          {(removeStar, { error }) => {
            let reminder;
            if (error) {
              reminder = true;
            }
            return (
              <div>
                {reminder ? this.renderReminder(starred, star) : ""}
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
      );
    } else {
      return (
        <Mutation mutation={ADD_STAR} variables={{ id: star.node.id }}>
          {(addStar, { error }) => {
            let reminder;
            if (error) {
              reminder = true;
            }
            return (
              <div>
                {reminder ? this.renderReminder(starred, star) : ""}
                <span style={styles.row}>
                  <div onClick={addStar}>
                    <Button kind="primary">
                      <i className="far fa-star" style={styles.unstar} />
                      Star
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
      );
    }
  }

  isActiveRepo() {
    if (
      this.props.currentRepo &&
      this.props.currentRepo.repoId === this.props.star.node.id
    ) {
      return true;
    }
    return false;
  }

  handleOpenDetail() {
    const repoInfo = {
      repoId: this.props.star.node.id,
      repoOwner: this.props.star.node.owner.login,
      repoName: this.props.star.node.name
    };
    this.props.receiveRepo(repoInfo);
  }

  render() {
    const star = this.props.star;
    const page = this.props.page;
    const language = star.node.primaryLanguage;
    const starred = star.node.viewerHasStarred;
    if (!language) return null;
    if (page === "stars" && !star.node.viewerHasStarred) return null;
    const topics = star.node.repositoryTopics.edges.map(
      topicNode => topicNode.node.topic.name
    );
    return (
      <div
        style={this.isActiveRepo() ? [styles.base, styles.active] : styles.base}
        onClick={() => this.handleOpenDetail()}
      >
        {this.renderMutation(starred, star)}
        <span dangerouslySetInnerHTML={this.rawMarkup(star)} />
        <span style={[styles.row, styles.small]}>
          <div>
            <div
              style={[styles.circle, { backgroundColor: `${language.color}` }]}
            />
            {language.name}
          </div>
          <div style={styles.margin}>
            <i className="fas fa-star" />
            {star.node.stargazers.totalCount}
          </div>
          <div>
            <i className="fas fa-code-branch" />
            {star.node.forkCount}
          </div>
          <div style={styles.margin}>
            Updated {timeago().format(star.node.updatedAt)}
          </div>
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
    alignItems: "baseline",
    textAlign: "middle"
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
  },
  unstar: {
    color: "rgb(134, 128, 128)"
  },
  margin: {
    margin: "0 10px"
  },
  small: {
    fontSize: "12px"
  },
  active: {
    backgroundColor: "#f6f8fa",
    boxShadow: "rgb(209, 213, 218) 0px 1px 7px 0px inset"
  }
};

export default Radium(StarItem);
