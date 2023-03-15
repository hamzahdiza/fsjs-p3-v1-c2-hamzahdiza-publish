import { useQuery, gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      description
      slug
      price
      mainImg
      categoryId
      authorId
      UserMongoId
      createdAt
      updatedAt
      Category {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slugProduct: String!) {
    getProductBySlug(slugProduct: $slugProduct) {
      id
      name
      description
      slug
      price
      mainImg
      categoryId
      authorId
      UserMongoId
      createdAt
      updatedAt
      Category {
        id
        name
        createdAt
        updatedAt
      }
      Images {
        id
        productId
        imgUrl
        createdAt
        updatedAt
      }
      User {
        _id
        id
        username
        email
        password
        role
        phoneNumber
        address
        createdAt
        updatedAt
      }
    }
  }
`;
