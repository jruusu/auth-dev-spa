# auth0-spa-api-demo
Quick demo of a single page web app with
* Auth0 login
* Backend API call with bearer token authentication

Code in this repo is mostly based on Quick Start examples by [Auth0](https://auth0.com/).

## Prerequisites
* Node.js 8.12
* [The Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Initial setup
1) Set up an Auth0 account, domain, and application (type: Single Page App)
2) From the [Auth0 console](https://manage.auth0.com/#/applications), stick the _Domain_ as `AUTH0_DOMAIN` and _Client ID_ as `AUTH0_CLIENT_ID` in your local `.env` file.
3) In Auth0 console, create an API. Select the `RS256` _Signing Algorithm_. Stick your API _Identifier_ as `AUTH0_AUDIENCE` in your local `.env` file.

## Run it locally
`heroku local web`

## Run it in Heroku

1) Create a heroku app; [heroku create](https://devcenter.heroku.com/articles/creating-apps)
1) Set `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_AUDIENCE` as config vars. Instructions: [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)
1) Deploy to Heroku with Git; [git push heroku master](https://devcenter.heroku.com/articles/git)
