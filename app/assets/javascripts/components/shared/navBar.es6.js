import React from 'react';
import { connect } from 'react-apollo';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import currentUserQuery from '../posts/currentUserQuery';

class NavBarComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { current_user } = this.props;
    const loggedIn = !current_user.loading && current_user.result.current_user != null;
    const text = loggedIn ?
      current_user.result.current_user.name : "Login";

    const loginUrl = loggedIn ? '' : '/users/sign_in';

    return(
      <div className="nav">
        <AppBar
          title="ApolloRails"
          iconElementRight={<FlatButton label={text} href={loginUrl} linkButton={true} />}
        />
      </div>
    );
  }
}

function mapQueriesToProps({ ownProps, state }) {
  return {
    current_user: new currentUserQuery(),
  };
};

const NavBarWithData = connect({
  mapQueriesToProps,
})(NavBarComponent);

export default NavBarWithData;
