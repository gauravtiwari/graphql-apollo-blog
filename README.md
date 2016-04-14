# Apollo GraphQL client with React, running on Rails powered Graphql server (with server rendering)
*Note: Apollo (https://github.com/apollostack/apollo-client) is under heavy development.*

Simple setup to use new Graphql client: *Apollo* (https://github.com/apollostack/apollo-client) with Rails asset pipeline using `browserify-rails` and `react-rails` gem

Check out the `app/assets/javascripts` folder

```bash
components: Contains all react components splitted in directories (same namespace as rails views)
components.js: components manifest
```
## Features
* React with ES6 syntax
* Graph Server built on Rails using: `graphql-ruby` gem
* Graphql client: Apollo (https://github.com/apollostack/apollo-client)
* Babel transpiler
* NPM support

## Running
```bash
git clone git@github.com:gauravtiwari/apollo_on_rails.git
cd apollo_on_rails
bundle install
npm install
chmod 777 start
./start
# Or Alternatively
bundle exec foreman start
```
