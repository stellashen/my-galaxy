# My Galaxy - GitHub Stars Manager

<img src="https://res.cloudinary.com/devleg/image/upload/v1538509535/logo_transparent_background.png" width="300">

[Live Site](https://my-galaxy.herokuapp.com/)

My Galaxy is a web application that aims to help you manage your GitHub stars:

- View repositories you have starred,
- search for new repositories,
- star/unstar repositories,
- and open README in the right viewer

## Table of Contents

- [Technologies](#technologies)
- [Screenshots](#screenshots)
- [How To Use](#how-to-use)
- [MVP List](#mvp-list)
- [Technical Details](#technical-details)
  - [1 GitHub OAuth](#1-GitHub-OAuth)
  - [2 GraphQL query and mutation](#2-GraphQL-query-and-mutation)
- [Images Source](#Images-Source)
- [References](#references)

## Technologies

- [Rails 5](https://rubyonrails.org/): A server-side web application framework written in Ruby
- [React](https://reactjs.org/): A JavaScript library for building user interfaces
- [Redux](https://redux.js.org/): A JavaScript library for managing application state.
- [GitHub GraphQL API](https://developer.github.com/v4/): This is an OAuth app calling GitHub's GraphQL API
- [Apollo Client](https://www.apollographql.com/docs/react/): use GraphQL to build client applications
- [Radium](https://formidable.com/open-source/radium/): Inline styling library

## Screenshots

Before login:

<img src="https://res.cloudinary.com/devleg/image/upload/c_scale,w_1501/v1539257107/screenshot1.png" width="800px" >

Login with Github:

<img src="https://res.cloudinary.com/devleg/image/upload/v1539257102/screenshot2.png" width="800px" >

After login:

1. "My Starred Repos" page: view your stars

<img src="https://res.cloudinary.com/devleg/image/upload/v1539266165/screenshot3.png" width="800px" >

2. "Explore" page: search and star/unstar repositories

<img src="https://res.cloudinary.com/devleg/image/upload/v1539266171/screenshot4.png" width="800px" >

## How To Use

First, you need to have a GitHub account.

Go to [Live Site](https://my-galaxy.herokuapp.com/) and click "Sign In with Github" button, you will be redirected to authorize My Galaxy to access your user info, public repository and gists. Enter your credentials and authorize. - Hooray you are in!

Then you can:

1. View your starred repositories.

2. Search for new repositories.

3. Star/unstar repositories.

4. Click a repository to view its README directly on the right side. This way, you can browse through all your repos on one page, so you don't need to open 30 new tabs any more.

## MVP List

1. Host on Heroku and Create OAuth App

2. Authentication

3. Get starred repositories

- run query to get current user's starred repositories
- display starred repositories
- implement cursor-based pagination

4. Unstar repositories

- run mutation to unstar a starred repository
- unstarred repository will disappear from page

5. Search for and star new repositories

- search by keyword
- run mutation to star/unstar a repository

6. Open README in the right viewer

- click a repository to view its README.md in the right viewer

## Technical Details

### 1 GitHub OAuth

Refered to this article:
[How to Create a React App with Ruby on Rails](https://zayne.io/blog/how-to-create-a-react-app-with-ruby-on-rails)

I created two apps for local development and production.

<img src="https://res.cloudinary.com/devleg/image/upload/v1538289635/apps.png" width="600">

##### development

For local development, set the callback url to `http://localhost:3000/auth/github/callback`

In the terminal, run `rails secret` to generate a new secret key.

Create `/config/local_env.yml` file and add it to `.gitignore`. Store local environment variables:

```
GITHUB_CLIENT_ID: 'replace with dev app id'
GITHUB_CLIENT_SECRET: 'dev app secret'
SECRET_KEY_BASE: 'new secret key'
```

In `config/secrets.yml`, add github_client_id and github_client_secret:

```
development:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
  github_client_id: <%= ENV["GITHUB_CLIENT_ID"] %>
  github_client_secret: <%= ENV["GITHUB_CLIENT_SECRET"] %>
```

##### production

For production, set to `https://my-galaxy.herokuapp.com/auth/github/callback`

In `config/secrets.yml`, add github_client_id and github_client_secret:

```
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>
  github_client_id: <%= ENV["GITHUB_CLIENT_ID"] %>
  github_client_secret: <%= ENV["GITHUB_CLIENT_SECRET"] %>
```

After registering an app with home url https://my-galaxy.herokuapp.com/, get id and secret from its settings page.

In terminal, run:

```
heroku config:add GITHUB_CLIENT_ID='replace with production app id' GITHUB_CLIENT_SECRET='production app secret'
```

### 2 GraphQL query and mutation

To get starred repositories:

```
const GET_STARS = gql`
  query Stars($afterCursor: String) {
    viewer {
      starredRepositories(
        first: 50
        after: $afterCursor
        orderBy: { field: STARRED_AT, direction: DESC }
      ) {
        totalCount
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
            description
            url
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
```

To unstar a starred repository:

```
const UNSTAR_REPOSITORY = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;
```

To search among all repos on GitHub:

```
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
```

## Images Source

Zoltan Tasi https://unsplash.com/photos/n8HAQ26GnMc

Muchmoji https://giphy.com/stickers/space-travel-39pqRFi5Gw0MpGug0w

## References

[A complete React with Apollo and GraphQL Tutorial](https://www.robinwieruch.de/react-graphql-apollo-tutorial/)

[Pagination | Apollo Client](https://www.apollographql.com/docs/react/features/pagination.html)

[react-apollo-client-pagination-example](https://github.com/rwieruch/react-apollo-client-pagination-example)

[How to search with Github GraphQL](https://medium.com/@katopz/how-to-search-with-github-graphql-e6c142dc61ed)

[Regex Cheat Sheet](https://www.rexegg.com/regex-quickstart.html)
