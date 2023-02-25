const userAPI = "http://localhost:4001/users";
const productAPI = "http://localhost:4002";
const axios = require("axios");
const Redis = require("ioredis");
require("dotenv").config();

const redis = new Redis({
  port: 17812, // Redis port
  host: "redis-17812.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: process.env.password,
});

class appControlller {
  static async orcGetAllProducts(req, res, next) {
    try {
      const productsCache = await redis.get("redisProducts");
      if (productsCache) {
        const data = JSON.parse(productsCache);
        console.log(data, "REDISSSSSSSSSSSSSSSSSSSSSSSSSs");
        console.log("Masuk Redis");
        return res.status(200).json(data);
      }
      console.log("Kagak Masuk");
      const response = await axios({
        method: "GET",
        url: `${productAPI}/pub/products`,
      });
      await redis.set("redisProducts", JSON.stringify(response.data));
      // console.log("Masuk Orc");
      // console.log(response.data);
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async orcGetProductBySlug(req, res, next) {
    try {
      const { slugProduct } = req.params;
      console.log(slugProduct);
      const response = await axios({
        method: "GET",
        url: `${productAPI}/products/${slugProduct}`,
      });
      console.log(response);
      const dataUserMongo = await axios({
        method: "GET",
        url: `${userAPI}/${response.data.UserMongoId}`,
      });

      console.log(dataUserMongo);
      response.data.User = dataUserMongo.data;

      res.status(200).json(response.data);
    } catch (err) {
      // console.log("Masuk sini");
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async orcPostProduct(req, res, next) {
    try {
      const { name, description, price, mainImg, categoryId, images, UserMongoId } = req.body;
      console.log(req.body);

      const response = await axios({
        method: "POST",
        url: `${productAPI}/products`,
        data: {
          name,
          description,
          price,
          mainImg,
          categoryId,
          images,
          UserMongoId,
        },
      });

      res.status(201).json(response.data);
    } catch (err) {
      console.log(err.response.data);
      res.status(err.response.status).json({ message: err.response.data });
    }
  }

  static async orcPutProduct(req, res, next) {
    try {
      const { name, description, price, mainImg, categoryId, images } = req.body;
      console.log(req.body);

      const { slugProduct } = req.params;
      const response = await axios({
        method: "PUT",
        url: `${productAPI}/products/${slugProduct}`,
        data: {
          name,
          description,
          price,
          mainImg,
          categoryId,
          images,
        },
      });

      res.status(201).json(response.data);
    } catch (err) {
      console.log(err.response.data);
      res.status(err.response.status).json({ message: err.response.data });
    }
  }

  static async orcDeleteProduct(req, res, next) {
    try {
      const { idProduct } = req.params;
      const response = await axios({
        method: "DELETE",
        url: `${productAPI}/products/${idProduct}`,
      });
      // console.log(response);
      res.status(200).json(response.data);
    } catch (err) {
      console.log("Masuk sini");
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }
}

module.exports = appControlller;
