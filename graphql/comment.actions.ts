import { gql } from "@apollo/client";

export const GET_COURSE_COMMENTS = gql`
  query GetCourseComments($course_id: String!) {
    getCourseComments(course_id: $course_id) {
      comment
      user_id
    }
  }
`;

export const CREATE_COURSE_COMMENT = gql`
  mutation CreateComment(
    $user_id: String!
    $course_id: String!
    $comment: String!
  ) {
    createComment(
      createComment: {
        user_id: $user_id
        course_id: $course_id
        comment: $comment
      }
    ) {
      id
    }
  }
`;
