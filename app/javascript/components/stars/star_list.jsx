import React from "react";
import Radium from "radium";
import StarItem from "./star_item";

const StarList = ({ stars, page }) => (
  <ul style={styles.list}>
    {stars.map((star, idx) => (
      <li key={`${idx}${star.cursor}`}>
        <StarItem star={star} page={page} />
      </li>
    ))}
  </ul>
);

const styles = {
  list: {
    paddingTop: "20px"
  }
};

export default Radium(StarList);
