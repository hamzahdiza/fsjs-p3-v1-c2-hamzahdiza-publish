const HOST = "http://localhost:4002";
const HOSTUSER = "http://localhost:4001";
const axios = require("axios");

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
      const { data } = await axios.get(`${HOST}/pub/products`);
      return data;
    },

    getProductBySlug: async (_, { slugProduct }) => {
      const dataProduct = await axios.get(`${HOST}/pub/products/${slugProduct}`);
      // console.log(dataProduct.data.UserMongoId);
      const dataUser = await axios.get(`${HOSTUSER}/users/${dataProduct.data.UserMongoId}`);

      dataProduct.data.User = dataUser.data;
      return dataProduct.data;
    },
  },

  Mutation: {
    postProduct: async (_, { name, description, price, mainImg, categoryId, imagesArr, UserMongoId }) => {
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
      console.log(data);
      return data;
    },

    putProduct: async (_, { slugProduct, name, description, price, mainImg, categoryId, imagesArr, UserMongoId }) => {
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
      console.log(data);
      return data;
    },

    deleteProduct: async (_, { id }) => {
      console.log("masuk sisni delete", id);
      const { data } = await axios.delete(`${HOST}/products/${id}`);
      console.log(data);
      return data;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
