import { gql } from "@apollo/client";

export const GET_DISCUSSIONS = gql`
  query GetDiscussions {
    getDiscussions {
      id
      title
      content
      image
      user_id
      created_at
    }
  }
`;

export const DISCUSSION_COMMENTS = gql`
  query GetDiscussionComments($id: String!) {
    getDiscussionComments(id: $id) {
      id
      content
      discussion_id
      user_id
      created_at
    }
  }
`;

export const NESTED_COMMENTS = gql`
  query GetNestedComments($id: String!) {
    getNestedComments(id: $id) {
      id
      content
      comment_id
      user_id
      created_at
    }
  }
`;

export const ADD_DISCUSSION = gql`
  mutation CreateDiscussion(
    $title: String!
    $content: String!
    $image: String
    $user_id: String!
  ) {
    createDiscussion(
      discussion: {
        title: $title
        content: $content
        image: $image
        user_id: $user_id
      }
    ) {
      id
    }
  }
`;

export const ADD_DISCUSSION_COMMENT = gql`
  mutation CreateDComment(
    $user_id: String!
    $discussion_id: String!
    $content: String!
  ) {
    createDComment(
      comment: {
        user_id: $user_id
        discussion_id: $discussion_id
        content: $content
      }
    ) {
      id
    }
  }
`;

export const ADD_NESTED = gql`
  mutation CreateNestedComment(
    $user_id: String!
    $comment_id: String!
    $content: String!
  ) {
    createNestedComment(
      nestedComment: {
        user_id: $user_id
        comment_id: $comment_id
        content: $content
      }
    ) {
      id
    }
  }
`;
