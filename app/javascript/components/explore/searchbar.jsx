import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query, renderToStringWithData } from "react-apollo";
import Loading from "../shared/loading";

const SEARCH_REPOS = gql`
  query Search($keyword: String) {
    search(query: $keyword, type: REPOSITORY, first: 50) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        starredAt
        node {
          id
          name
          owner {
            id
            login
          }
          descriptionHTML
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
          repositoryTopics(first: 20) {
            edges {
              node {
                topic {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      language: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.emptyInput = this.emptyInput.bind(this);
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  emptyInput(field) {
    return this.setState(state => ({
      [field]: ""
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    // run query with this.state
    console.log(this.state.keyword);
    this.emptyInput("title");
  }

  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.keyword}
          onChange={this.update("keyword")}
          placeholder={`Search`}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
export default Radium(Searchbar);
