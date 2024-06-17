import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      username
      email
      profile_image
      preferences
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($id: String!) {
    getUserById(id: $id) {
      username
      profile_image
    }
  }
`;

export const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      username
      email
      profile_image
    }
  }
`;
