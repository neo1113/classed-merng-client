import React, { useState } from 'react';

// semantic ui
import { Button, Form, Grid } from 'semantic-ui-react';

// graphql
import gql from 'graphql-tag';
// listing post from home.js
import { FETCH_POSTS_QUERY } from '../util/graphql';

// custom hooks
import { useForm } from '../util/hooks';
//hooks
import { useMutation } from '@apollo/react-hooks';

// apollo-link-context
// npm install apollo-link-context

function PostForm() {
  const [errors, setErrors] = useState({});
  const { values, handleChange, handleSubmit } = useForm(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      // gets all data from the apollo cache (ROOT_QUERY) - assign it to data variable
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      //   console.log(data);
      //   data.getPosts = [result.data.createPost, ...data.getPosts];
      //   console.log(data.getPosts);
      // persist the action
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
      console.log(data);
      values.body = '';
    },
    onError(err) {
      console.log(err.graphQLErrors[0].message);
      setErrors(err.graphQLErrors[0].message); //err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div className='form-container'>
      <Grid>
        <Grid.Row textAlign='center'>
          <Grid.Column textAlign='center'>
            <Form onSubmit={handleSubmit} noValidate>
              <h2>Create a post:</h2>
              <Form.Field>
                <Form.Input
                  type='text'
                  placeholder='Hi World..'
                  name='body'
                  onChange={handleChange}
                  value={values.body}
                  error={errors.body ? true : false}
                />
                <Button type='submit' color='teal'>
                  Submit
                </Button>
              </Form.Field>
            </Form>
            {Object.keys(errors).length > 0 && (
              <div className='ui error message'>
                <div className='list'>
                  {Object.values(errors).map((value, index) => (
                    <span key={index}>{value}</span>
                  ))}
                </div>
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        createdAt
        body
      }
      likeCount
      commentCount
    }
  }
`;

export default PostForm;
