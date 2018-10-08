import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";
import ErrorMessage from "../shared/error_message";
import StarList from "../stars/star_list";
import Button from "../shared/button";
import Searchbar from "./searchbar";

const SEARCH_REPOS = gql`
  query Search($keyword: String!) {
    search(query: $keyword, type: REPOSITORY, first: 50) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          ... on Repository {
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
  }
`;

const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    edges: [...previousResult.edges, ...fetchMoreResult.edges]
  };
};

class Explore extends React.Component {
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
      <div style={styles.base}>
        <input
          type="text"
          value={this.state.keyword}
          onChange={this.update("keyword")}
          placeholder="Search Repo"
          onKeyPress={this.handleKeyPress}
        />

        <Query query={SEARCH_REPOS} variables={{ keyword: this.state.keyword }}>
          {({ data: { search }, loading, error, fetchMore }) => {
            if (error) {
              return <ErrorMessage error={error} />;
            }

            if (loading || !search.edges) {
              return <Loading />;
            }

            const repos = search.edges;

            const totalCount = search.repositoryCount;

            return (
              <div>
                <span style={styles.header}>
                  Result: <strong>{totalCount}</strong> repositories.
                </span>
                <StarList stars={repos} />
                {search.pageInfo.hasNextPage && (
                  <Button
                    kind="primary"
                    onClick={() =>
                      fetchMore({
                        variables: {
                          afterCursor: repos.pageInfo.endCursor
                        },
                        updateQuery
                      })
                    }
                  >
                    Load More
                  </Button>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const styles = {
  base: {
    padding: "20px"
  },
  header: {
    fontSize: "16px"
  }
};

export default Radium(Explore);
