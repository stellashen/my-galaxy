# My Galaxy - GitHub Stars Manager

[Live Site](https://my-galaxy.herokuapp.com/)

My Galaxy is a web application that aims to help you manage your GitHub stars:

- View repositories you have starred,
- search for and star new repositories,
- and un-star repositories.

## Table of Contents

- [Technologies](#technologies)
- [MVP List](#mvp-list)
- [Technical Details](#technical-details)
  - [1 GitHub OAuth](#1-GitHub OAuth)
  - [2](#2)
- [References](#references)

## Technologies

- Rails 5
- React
- [GitHub GraphQL API](https://developer.github.com/v4/)
- [Apollo Client](https://www.apollographql.com/docs/react/): use GraphQL to build client applications
- [Radium](https://formidable.com/open-source/radium/): Inline styling library

## MVP List

1. Host on Heroku and Create OAuth App

2. Authentication

3. Get starred repositories

4. Unstar repositories

5. Search for and star new repositories

6. Jest tests

## Technical Details

### 1 GitHub OAuth

Refered to this article:
[How to Create a React App with Ruby on Rails](https://zayne.io/blog/how-to-create-a-react-app-with-ruby-on-rails)

I created two apps for local development and production.

![OAUTH APPS](https://res.cloudinary.com/devleg/image/upload/v1538289635/apps.png)

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

### 2
