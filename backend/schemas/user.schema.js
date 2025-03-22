const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    isVerified: Boolean!
  }

  type AuthPayload {
    token: String
    user: User
    message: String
  }

  type Query {
    me: User
  }

  type Mutation {
    registerCustomer(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthPayload

    registerAdmin(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthPayload

    loginAdmin(email: String!, password: String!): AuthPayload

    verifyEmail(token: String!): AuthPayload
  }
`;

module.exports = typeDefs;
