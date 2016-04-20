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
    const { data } = this.props;
    const loggedIn = !data.loading && data.result.current_user != null;
    const text = loggedIn ?
      data.result.current_user.name : "Login";

    const loginUrl = loggedIn ? '/users/sign_out' : '/users/sign_in';

    const method = loggedIn ? 'DELETE' : 'GET';

    return(
      <div className="nav">
        <AppBar
          title="ApolloRails"
          iconElementRight={
            <FlatButton
              label={text}
              data-method={method}
              href={loginUrl}
              linkButton={true}
            />
          }
        />
      </div>
    );
  }
}

function mapQueriesToProps({ ownProps, state }) {
  return {
    data: new currentUserQuery(),
  };
};

const NavBarWithData = connect({
  mapQueriesToProps,
})(NavBarComponent);

export default NavBarWithData;
