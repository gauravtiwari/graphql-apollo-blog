# An apollo version of the web blog built on relay and GraphQL

Simple setup to use new Graphql client: *Apollo* (https://github.com/apollostack/apollo-client) with Rails asset pipeline using `webpack` with a few helpers for dynamic react rendering. The relay version is available here [https://github.com/gauravtiwari/relay-rails-blog](https://github.com/gauravtiwari/relay-rails-blog)

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
