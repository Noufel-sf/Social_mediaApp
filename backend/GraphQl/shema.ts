// graphql/schema.js
import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    profileImg: String
    coverImg: String
    friends: [User]
  }

  # -------------- QUERIES --------------
  type Query {
    currentUser: User
    user(id: ID!): User
    users: [User]
    recommendedUsers: [User]
    friends: [User]
  }

  # -------------- MUTATIONS --------------
  type Mutation {
    register(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
    logout: Boolean

    updateUserProfile(
      id: ID!
      username: String
      email: String
      profileImg: Upload
    ): User

    updateCoverImg(id: ID!, coverImg: Upload): User
  }
`;
