import React from "react";
import Radium from "radium";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loading from "../shared/loading";
import ErrorMessage from "../shared/error_message";
import StarList from "../stars/star_list";
import Button from "../shared/button";

const SEARCH_REPOS = gql`
  query Search($keyword: String!, $afterCursor: String) {
    search(query: $keyword, type: REPOSITORY, first: 50, after: $afterCursor) {
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
    search: {
      ...previousResult.search,
      pageInfo: {
        ...fetchMoreResult.search.pageInfo
      },
      edges: [...previousResult.search.edges, ...fetchMoreResult.search.edges]
    }
  };
};

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      language: ""
    };
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  render() {
    return (
      <div style={styles.base}>
        <span style={[styles.header, styles.searchbar]}>
          <i className="fas fa-search" style={styles.searchicon} />
          <input
            type="text"
            value={this.state.keyword}
            onChange={this.update("keyword")}
            placeholder="Search Repo"
            onKeyPress={this.handleKeyPress}
            style={styles.searchinput}
          />
        </span>

        {this.state.keyword.length > 0 && (
          <Query
            query={SEARCH_REPOS}
            variables={{ keyword: this.state.keyword }}
          >
            {({ data: { search }, loading, error, fetchMore }) => {
              if (error) {
                return <ErrorMessage error={error} />;
              }

              if (loading || !search.edges) {
                return <Loading />;
              }

              const repos = search.edges;

              const totalCount = search.repositoryCount;

              const hasNextPage = search.pageInfo.hasNextPage;

              return (
                <div>
                  <span style={styles.header}>
                    Result: <strong>{totalCount}</strong> repositories.
                  </span>
                  <StarList stars={repos} page="search" />
                  {!hasNextPage && (
                    <span>You have reached the end of the list.</span>
                  )}
                  {hasNextPage && (
                    <Button
                      kind="primary"
                      onClick={() =>
                        fetchMore({
                          variables: {
                            afterCursor: search.pageInfo.endCursor
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
        )}
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
  },
  searchbar: {
    border: "1px solid rgba(27,31,35,0.2)",
    padding: "5px 8px",
    marginBottom: "20px"
  },
  searchicon: {
    marginRight: "10px",
    color: "rgb(99, 94, 94)"
  },
  searchinput: {
    width: "calc(100% - 36px)"
  }
};

export default Radium(Explore);
