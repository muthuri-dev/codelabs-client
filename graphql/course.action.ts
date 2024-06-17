import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation CreateCourses($user_id: String!, $course_content: String!) {
    createCourses(
      courseInputs: { user_id: $user_id, course_content: $course_content }
    ) {
      id
    }
  }
`;

export const GET_USER_UPLOADED = gql`
  query GetUserUploadedCourses($user_id: String!) {
    getUserUploadedCourses(id: $user_id) {
      id
      main_title
      category_id
      level_id
      course_thumbnail
      course_type
      publish
      create_at
      updated_at
    }
  }
`;

export const UPDATE_COURSE = gql`
  mutation UpdateCourses(
    $id: String!
    $main_title: String!
    $category_id: String!
    $level_id: String!
    $course_thumbnail: String!
    $short_description: String!
    $course_description: String!
    $course_type: String!
    $course_promo_video: String
    $publish: Boolean!
  ) {
    updateCourses(
      updateInputs: {
        id: $id
        main_title: $main_title
        category_id: $category_id
        level_id: $level_id
        course_thumbnail: $course_thumbnail
        short_description: $short_description
        course_description: $course_description
        course_type: $course_type
        course_promo_video: $course_promo_video
        publish: $publish
      }
    ) {
      id
    }
  }
`;

export const GET_COURSE_BY_ID = gql`
  query GetCourseById($id: String!) {
    getCourseById(id: $id) {
      id
      main_title
      level_id
      course_thumbnail
      course_description
      short_description
      course_type
      user_id
      create_at
      course_content
    }
  }
`;

export const GET_COURSES = gql`
  query GetCourses {
    getCourses {
      id
      main_title
      level_id
      course_thumbnail
      short_description
      course_type
      publish
      user_id
    }
  }
`;
