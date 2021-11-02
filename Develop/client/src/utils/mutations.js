import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login() {
      login() {
          token
          user {

          }
      }
  }
`;

export const ADD_USER = gql`
   mutation createUser() {
      createUser() {
          token
          user {
              
          }
      }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook() {
    saveBook() {
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook() {
    removeBook() {
    }
}
`;
