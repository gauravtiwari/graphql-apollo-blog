import React from 'react';
import { graphql } from 'react-apollo';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CurrentUserQuery from '../posts/currentUserQuery';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import Turbolinks from 'turbolinks';

const titleStyle = {
  cursor: 'pointer',
};

class NavBarComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    };
  }

  render() {
    const { data } = this.props;
    const loggedIn = !data.loading && data.current_user != null;
    const text = loggedIn ?
      data.current_user.name : "Login";

    const loginUrl = loggedIn ? '/users/sign_out' : '/users/sign_in';

    const method = loggedIn ? 'DELETE' : 'GET';

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className="nav">
          <AppBar
            className="navbar"
            title="ApolloRails"
            titleStyle={titleStyle}
            onTitleTouchTap={() => Turbolinks.visit('/')}
            iconElementRight={
              <FlatButton
                label={text}
                data-method={method}
                href={loginUrl}
              />
            }
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

NavBarComponent.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

const NavBarWithData = graphql(CurrentUserQuery)(NavBarComponent);

export default NavBarWithData;
