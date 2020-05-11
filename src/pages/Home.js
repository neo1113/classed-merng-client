import React, { useContext } from 'react';

// instal graphql
// npm install graphql grapghql-tag
// import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

// context
import { AuthContext } from '../context/auth';

// components
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

// util - separates the gql of listing post as it will be re-used on PostForm
import { FETCH_POSTS_QUERY } from '../util/graphql';

// semantic ui
import { Grid, Transition } from 'semantic-ui-react';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = !loading ? data.getPosts : null;
  return (
    <Grid columns={3}>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>{user && <PostForm />}</Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
