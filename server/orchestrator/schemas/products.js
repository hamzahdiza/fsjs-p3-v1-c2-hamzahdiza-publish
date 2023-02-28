// const HOST = "http://localhost:4002";
// const HOSTUSER = "http://localhost:4001";
const HOST = "http://app:4002";
const HOSTUSER = "http://users:4001";
const axios = require("axios");
const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis({
  port: 17812, // Redis port
  host: "redis-17812.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: process.env.password_redis,
});

const typeDefs = `#graphql
  type CategoryField {
    id: ID!
    name: String
    createdAt: String
    updatedAt: String
  }

  type ImagesField {
    id: ID!
    productId: Int
    imgUrl: String
    createdAt: String
    updatedAt: String
  }

  type UserField {
  _id: ID!
  id: String
  username: String
  email: String
  password: String
  role: String
  phoneNumber: String
  address: String
  createdAt: String
  updatedAt: String
  }

  type Products {
    id: ID!
    name: String
    description: String
    slug: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: Int
    UserMongoId: String
    createdAt: String
    updatedAt: String
    Category: CategoryField
  }

  type ProductBySlug {
    id: ID!
    name: String
    description: String
    slug: String
    price: Int
    mainImg: String
    categoryId: Int
    authorId: Int
    UserMongoId: String
    createdAt: String
    updatedAt: String
    Category: CategoryField
    Images: [ImagesField]
    User: UserField
  }

  type addProductField {
    id: ID!
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: Int
    UserMongoId: String
    updatedAt: String
    createdAt: String
    authorId: Int
  },

  type postProductResult {
    message: String
    addProduct: addProductField
    imagePost: [ImagesField]
  }

  input ImageInput {
   imageInput: String
  }

  type putProductResult {
    message: String
  }

  type deleteProductResult {
    message: String
  }


  type Query {
    getAllProducts: [Products]
    getProductBySlug(slugProduct: String!): ProductBySlug
  }

  type Mutation {
    postProduct(name: String!, description: String!, price: Int!, mainImg: String!, categoryId: Int!, imagesArr:[ImageInput], UserMongoId: String!): postProductResult,
    putProduct(slugProduct:String!,name: String!, description: String!, price: Int!, mainImg: String!, categoryId: Int!, imagesArr:[ImageInput], UserMongoId: String!): putProductResult,
    deleteProduct(id: Int!): deleteProductResult
  }
`;

const resolvers = {
  Query: {
    getAllProducts: async () => {
      try {
        const productsCache = await redis.get("cacheProducts");
        if (productsCache) {
          const data = JSON.parse(productsCache);
          // console.log(data, "REDISSSSSSSSSSSSSSSSSSSSSSSSSs");
          console.log("Masuk Redis");
          return data;
        } else {
          console.log("Kagak Masuk");
          const { data } = await axios.get(`${HOST}/pub/products`);
          await redis.set("cacheProducts", JSON.stringify(data));
          return data;
        }
      } catch (err) {
        return err;
      }
    },

    getProductBySlug: async (_, { slugProduct }) => {
      try {
        console.log(slugProduct);
        const dataProduct = await axios.get(`${HOST}/pub/products/${slugProduct}`);
        // console.log(dataProduct.data.UserMongoId);
        const dataUser = await axios.get(`${HOSTUSER}/users/${dataProduct.data.UserMongoId}`);
        dataProduct.data.User = dataUser.data;
        return dataProduct.data;
      } catch (err) {
        return err;
      }
    },
  },

  Mutation: {
    postProduct: async (_, { name, description, price, mainImg, categoryId, imagesArr, UserMongoId }) => {
      try {
        console.log(name, description, price, mainImg, categoryId, imagesArr, UserMongoId);
        const loopImages = imagesArr.map((el) => {
          return el.imageInput;
        });
        const images = loopImages;
        console.log(images);
        const { data } = await axios.post(`${HOST}/products`, {
          name,
          description,
          price,
          mainImg,
          categoryId,
          images,
          UserMongoId,
        });
        redis.flushall("ASYNC");
        console.log(data);
        return data;
      } catch (err) {
        return err;
      }
    },

    putProduct: async (_, { slugProduct, name, description, price, mainImg, categoryId, imagesArr, UserMongoId }) => {
      try {
        console.log(name, description, price, mainImg, categoryId, imagesArr, UserMongoId);
        const loopImages = imagesArr.map((el) => {
          return el.imageInput;
        });
        const images = loopImages;
        console.log(images);
        const { data } = await axios.put(`${HOST}/products/${slugProduct}`, {
          name,
          description,
          price,
          mainImg,
          categoryId,
          images,
          UserMongoId,
        });
        redis.flushall("ASYNC");
        console.log(data);
        return data;
      } catch (err) {
        return err;
      }
    },

    deleteProduct: async (_, { id }) => {
      try {
        console.log("masuk sisni delete", id);
        const { data } = await axios.delete(`${HOST}/products/${id}`);
        redis.flushall("ASYNC");
        console.log(data);
        return data;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
