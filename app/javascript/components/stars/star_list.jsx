import React from "react";
import Radium from "radium";
import StarItem from "./star_item";
import RepoDetail from "../repo_detail";

const StarList = ({ stars, page }) => (
  <div style={styles.list}>
    <section style={styles.leftSection}>
      <ul>
        {stars.map((star, idx) => (
          <li key={`${idx}${star.cursor}`}>
            <StarItem star={star} page={page} />
          </li>
        ))}
      </ul>
    </section>
    <section style={styles.rightSection}>
      <RepoDetail />
    </section>
  </div>
);

const styles = {
  list: {
    paddingTop: "20px",
    display: "flex"
  },
  leftSection: {
    width: "50%",
    paddingRight: "20px"
  },
  rightSection: {
    width: "50%",
    height: "80vh",
    paddingLeft: "20px",
    border: "1px solid #d1d5da",
    borderRadius: "5px"
  }
};

export default Radium(StarList);
