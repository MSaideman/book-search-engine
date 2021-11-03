import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          token
          user {

          }
      }
  }
`;

export const ADD_USER = gql`
   mutation createUser($username: String!, $email: String!, $password: String!) {
      createUser(username: $username, email: $email, password: $password) {
          token
          user {
              
          }
      }
  }
`;

export const SAVE_BOOK = gql`
mutation saveBook($authors: [String], $description: String!, $title: String!, $bookId: String!, $image: String, $userId: String) {
    saveBook(authors: $authors, description: $description, title: $title, bookId: $bookId, image: $image, userId:$userId) {
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
    }
}
`;
