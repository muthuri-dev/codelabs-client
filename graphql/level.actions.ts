import { gql } from "@apollo/client";

export const GET_LEVELS = gql`
  query GetLevels {
    getLevels {
      id
      level
    }
  }
`;
