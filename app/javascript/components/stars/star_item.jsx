import React from "react";
import Radium from "radium";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import solids from "@fortawesome/fontawesome-free-solid";

class StarItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const star = this.props.star;
    const language = star.node.primaryLanguage;
    if (!language) return null;
    return (
      <div style={styles.base}>
        <span style={styles.row}>
          <button>
            <FontAwesomeIcon icon="star" style={styles.starred} /> Unstar
          </button>
          <a href={star.node.url} target="_blank">
            <h1 style={styles.h1}>
              {star.node.owner.login} / <strong>{star.node.name}</strong>
            </h1>
          </a>
        </span>
        <span>Starred on {star.starredAt.split("T")[0]}</span>
        <span>{star.node.description}</span>
        <span>
          <div
            style={[styles.circle, { backgroundColor: `${language.color}` }]}
          />
          {language.name}
        </span>
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
  h1: {
    padding: "0 20px",
    color: "#1E6ED6",
    ":hover": {
      textDecoration: "underline"
    }
  },
  row: {
    display: "flex"
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
