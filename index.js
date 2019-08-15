



// using apollo-server 2.x
const { ApolloServer } = require('apollo-server');
const axios = require('axios');

const baseURL = `https://jsonplaceholder.typicode.com`;

const typeDefs = `type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
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
  }`
const resolvers = {
    Query: {
      users: () => {
        return axios.get(`${baseURL}/users`).then(res => res.data);
        // return fetch(`${baseURL}/users`).then(res => res.json());
      },
      user: (parent, args) => {
        const { id } = args;
        return axios.get(`${baseURL}/users/${id}`).then(res => res.data);
        // return fetch(`${baseURL}/users/${id}`).then(res => res.json());
      },
      posts: () => {
        return axios.get(`${baseURL}/posts`).then(res => res.data);
        // return fetch(`${baseURL}/posts`).then(res => res.json());
      },
      post: (parent, args) => {
        const { id } = args;
        return axios.get(`${baseURL}/posts/${id}`).then(res => res.data);
        // return fetch(`${baseURL}/posts/${id}`).then(res => res.json());
      }
    },
    Post: {
      author: parent => {
        const { id } = parent;
        return axios.get(`${baseURL}/users/${id}/todos`).then(res => res.data);
        // return fetch(`${baseURL}/users/${id}/todos`).then(res => res.json());
      }
    },
    User: {
      posts: parent => {
        const { id } = parent;
        return axios.get(`${baseURL}/posts/${id}/todos`).then(res => res.data);
        // return fetch(`${baseURL}/posts/${id}/todos`).then(res => res.json());
      }
    }
  };



const server = new ApolloServer({
 typeDefs,
 resolvers
});

server.listen().then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`)
});