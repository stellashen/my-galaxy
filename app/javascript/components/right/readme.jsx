import React from "react";
import Radium from "radium";
import Markdown from "react-markdown";

class Readme extends React.Component {
  constructor(props) {
    super(props);
  }

  handleText(text) {
    // some images cannot be rendered, change them to links

    // 1. handle Cross-Origin Read Blocking (CORB) for images in Github
    // example: ![screenshot](https://github...)   absolute path to github
    // Note: don't do this for other sites because images can be uploaded from some sites such as Cloudinary

    // 2. also handle image's relative path to github
    // example: ![](/images/image.png)
    // here we convert it to [link to image](/images/image.png)
    // then it will be found again in step 3
    const array = text.match(/!\[.*?\]\(/g);
    if (array) {
      let currentIdx = 0;
      array.forEach(el => {
        const urlStartIdx = text.indexOf(el, currentIdx) + el.length;
        const url = text.substring(urlStartIdx, urlStartIdx + 14);
        if (
          url === "https://github" ||
          url === "http://github." ||
          url.slice(0, 4) !== "http"
        ) {
          text = text.replace(el, "[link to image](");
        }
        currentIdx = urlStartIdx + 1;
      });
    }

    // 3. handle relative path to github
    const array2 = text.match(/\[.*?\]\(/g);
    if (array2) {
      let currentIdx = 0;
      array2.forEach(el => {
        const urlStartIdx = text.indexOf(el, currentIdx) + el.length;
        const urlEndIdx = text.indexOf(")", urlStartIdx);
        const path = text.substring(urlStartIdx, urlEndIdx);
        if (path.substring(0, 4) !== "http") {
          text =
            text.slice(0, urlStartIdx) +
            `${this.props.repository.url}/tree/master/` +
            text.slice(urlStartIdx);
        }
        currentIdx = urlEndIdx;
      });
    }

    console.log(text);

    // 4. handle img tag
    // example: <img src="...">
    let startIdx = text.indexOf("<img src=");
    while (startIdx !== -1) {
      const endIdx = text.indexOf(">", startIdx);
      const imgText = text.substring(startIdx, endIdx + 1);
      let urlEnd = imgText.indexOf('"', 10);
      if (!urlEnd) {
        urlEnd = imgText.indexOf("'", 10);
      }
      if (urlEnd) {
        const relativeUrl = imgText.substring(10, urlEnd);
        if (relativeUrl && relativeUrl.substring(0, 4) !== "http") {
          const absoluteUrl = `${
            this.props.repository.url
          }/tree/master/${relativeUrl}`;
          const newImgText = `<a href="${absoluteUrl}" target="_blank">${absoluteUrl}</a>`;
          text = text.replace(imgText, newImgText);
          startIdx = text.indexOf(
            "<img src=",
            endIdx - imgText.length + newImgText.length
          );
        } else {
          startIdx = text.indexOf('<img src="', endIdx);
        }
      } else {
        startIdx = text.indexOf('<img src="', endIdx);
      }
    }
    return text;
  }

  render() {
    const { repository } = this.props;
    console.log(repository.object.text);
    return (
      <div style={styles.base}>
        <Markdown
          source={
            repository.object
              ? this.handleText(repository.object.text)
              : `No README available`
          }
          escapeHtml={false}
          linkTarget="_blank"
          className="markdown"
        />
      </div>
    );
  }
}

const styles = {
  base: {
    padding: "20px"
  }
};

export default Radium(Readme);
