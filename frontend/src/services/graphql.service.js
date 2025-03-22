import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Set up HTTP connection to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// Add the authorization token to the headers
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// GraphQL Mutations
export const REGISTER_CUSTOMER = gql`
  mutation RegisterCustomer($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerCustomer(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      message
    }
  }
`;

export const REGISTER_ADMIN = gql`
  mutation RegisterAdmin($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerAdmin(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      message
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
      user {
        id
        firstName
        lastName
        email
        role
      }
      message
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($token: String!) {
    verifyEmail(token: $token) {
      token
      user {
        id
        firstName
        lastName
        email
        role
      }
      message
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      role
      isVerified
    }
  }
`;

export default client;