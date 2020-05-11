import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// apollo
import { useMutation } from '@apollo/react-hooks';

// gql
import gql from 'graphql-tag';

// semantic ui
import { Button, Label, Icon } from 'semantic-ui-react';

// util
import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likes, likeCount } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost, { loading }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    update(proxy, result) {
      // console.log(likes);
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to='/login' color='teal' basic>
      <Icon name='heart' />
    </Button>
  );

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      <MyPopup content={liked ? 'Unlike post' : 'Like post'}>
        {likeButton}
      </MyPopup>
      <Label basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

export default LikeButton;
