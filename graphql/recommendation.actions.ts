import { gql } from "@apollo/client";

export const GET_COURSE_RECOMMENDATIONS = gql`
  query GetCourseRecomm($course_id: String!) {
    getCourseRecomm(course_id: $course_id) {
      user_id
      recommendation
      done
    }
  }
`;

export const CREATE_RECOMMENDATION = gql`
  mutation AddRecommendation(
    $user_id: String!
    $course_id: String!
    $recommendation: String!
  ) {
    addRecommendation(
      createRecommendation: {
        user_id: $user_id
        course_id: $course_id
        recommendation: $recommendation
      }
    ) {
      course_recommendation {
        id
      }
    }
  }
`;
