const User = require("../models/user");
const service = require("../services");
const uuidv4 = require("uuid/v4");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const baseURL = `https://jsonplaceholder.typicode.com`;
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
    posts: (parent, args, context) => {
      if (!context.user) return null;
      // if (!context.user || !context.user.roles.includes('admin')) return null;
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
  },
  Mutation: {
    // Handle user signup
    async signup(_, { username, email, password }) {
      var user = new User();
      user.uuid = uuidv4();
      user.username = username;
      user.email = email;
      user.password = password;
      user.avatar = user.gravatar();
      User.findOne({ email: email }, function(err, existingUser) {
        if (existingUser) {
          throw new Error(`Account with that email address already exists`);
        } else {
          user.save(function(err, user) {
            if (err) {
              console.log(err);
              throw new Error(err);
            } else {
              return { token: service.createToken(user) };
            }
          });
        }
      });
      // devolvemos json web token
      return service.createToken(user);
    },

    // Handles user login
    async login(_, { email, password }) {
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("No user with that email");
      }
      const valid = await bcrypt.compareSync(password, user.password);

      if (!valid) {
        throw new Error("Incorrect password");
      }
      return service.createToken(user);
    }
  }
};

module.exports = resolvers;
