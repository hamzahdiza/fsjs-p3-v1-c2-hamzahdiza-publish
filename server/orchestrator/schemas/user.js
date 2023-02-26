const HOST = "http://localhost:4001";
const axios = require("axios");

const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type UserById {
    _id: ID!
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type postUserResult {
    _id: String
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type deleteUserResult {
  message: String
  }

  type Query {
    getAllUsers: [User]
    getUserById(id: String!): UserById
  }

  type Mutation {
    postUser(username: String!, email: String!, password: String!, phoneNumber: String!, address: String!): postUserResult

    deleteUser(id: String!): deleteUserResult
  }
`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      const { data } = await axios.get(`${HOST}/users`);
      return data;
    },

    getUserById: async (_, { id }) => {
      const { data } = await axios.get(`${HOST}/users/${id}`);
      return data;
    },
  },

  Mutation: {
    postUser: async (_, { username, email, password, phoneNumber, address }) => {
      const { data } = await axios.post(`${HOST}/users`, {
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      console.log(data);
      return data;
    },

    deleteUser: async (_, { id }) => {
      console.log("masuk sisni", id);
      const { data } = await axios.delete(`${HOST}/users/${id}`);
      console.log(data);
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
