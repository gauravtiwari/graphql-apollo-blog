import React from 'react';
import PostQuery from './postQuery';
import { connect } from 'react-apollo';

import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

class PostsShowComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    let postPreview;

    if (data.loading) {
      postPreview = "Loading...";
    } else {
      postPreview = <Card>
                      <CardTitle
                        title={data.result.post.title}
                        subtitle={data.result.post.user.name}
                      />
                      <CardText>
                        {data.result.post.body}
                      </CardText>
                    </Card>;
    }

    return(
      <div className="postsShow">
        {postPreview}
      </div>
    );
  }
}

function mapQueriesToProps({ ownProps, state }) {
  return {
    data: new PostQuery({id: ownProps.post.id}),
  };
};

const PostWithData = connect({
  mapQueriesToProps,
})(PostsShowComponent);

export default PostWithData;


