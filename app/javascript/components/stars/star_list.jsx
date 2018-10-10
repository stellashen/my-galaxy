import React from "react";
import Radium from "radium";
import StarItem from "./star_item";

const StarList = ({ stars, page }) => (
  <div style={[styles.list, styles.scroll]}>
    <ul>
      {stars.map((star, idx) => (
        <li key={`${idx}${star.cursor}`}>
          <StarItem star={star} page={page} />
        </li>
      ))}
    </ul>
  </div>
);

const styles = {
  list: {
    paddingTop: "20px"
  }
};

export default Radium(StarList);
