import { gql } from "@apollo/client";

export const ADD_ENROLL = gql`
  mutation AddEnroll($user_id: String!, $course_id: String!) {
    addEnroll(createEnrollment: { user_id: $user_id, course_id: $course_id }) {
      id
      user_id
      course_id
    }
  }
`;
