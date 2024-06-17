import { gql } from "@apollo/client";

export const ADD_BOOKMARK = gql`
  mutation AddBookmark($course_id: String!, $user_id: String!) {
    addBookmark(
      addBookmarkInput: { course_id: $course_id, user_id: $user_id }
    ) {
      bookmark {
        id
      }
    }
  }
`;

export const GET_BOOKMARKS = gql`
  query GetBookmarks {
    getBookmarks {
      course_id
      user_id
    }
  }
`;
