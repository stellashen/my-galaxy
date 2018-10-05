import React from "react";
import Radium from "radium";

const StarItem = ({ star }) => (
  <div style={styles.base}>
    <a href={star.node.url} target="_blank">
      <h1 style={styles.h1}>
        {star.node.owner.login} / <p style={styles.strong}>{star.node.name}</p>
      </h1>
    </a>
    <span style={styles.date}>Starred on {star.starredAt.split("T")[0]}</span>
    <span> {star.node.description}</span>
  </div>
);

const styles = {
  base: {
    marginBottom: "10px"
  },
  h1: {
    color: "#1E6ED6",
    ":hover": {
      textDecoration: "underline"
    }
  },
  strong: {
    fontWeight: "900",
    display: "inline"
  },
  date: {
    display: "block"
  }
};

export default Radium(StarItem);
