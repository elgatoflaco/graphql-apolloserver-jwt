"use strict";

const { ApolloServer } = require("apollo-server");
const axios = require("axios");
const mongoose = require("mongoose");
const config = require("./config");
const resolvers = require("./lib/resolvers");
const service = require("./services");

mongoose.Promise = require("bluebird");
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    promiseLibrary: require("bluebird")
  })
  .then(() => console.log("connection succesful"))
  .catch(err => console.error("Error connection MongoDB"));

const typeDefs = `type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]
    post(id: ID!): Post
  }
  
  type User {
    id: ID!
    username: String!
    name: String!
    email: String!
    phone: String!
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
  }
  query {
    users {
      id
      name
    }
  }
  
  type Mutation {
    "Añadir Usuario"
    signup (username: String!, email: String!, password: String!): String
    "Hacer login"
    login (email: String!, password: String!): String
  }`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let user = null;

    try {
      authToken = req.headers.authorization;

      if (authToken) {
        user = await service.decodeToken(authToken);
      }
    } catch (e) {
      console.warn(`Unable to authenticate using auth token: ${authToken}`);
    }
    return {
      authToken,
      user
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
