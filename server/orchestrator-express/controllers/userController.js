const userAPI = "http://localhost:4001/users";
const productAPI = "http://localhost:4001/pub/products";
const axios = require("axios");

class userControlller {
  static async orcGetAllUsers(req, res, next) {
    try {
      const response = await axios({
        method: "GET",
        url: `${userAPI}`,
      });
      // console.log(response.data);
      // console.log("Masuk Orc");
      console.log(response.data);
      res.status(200).json(response.data);
    } catch (err) {
      console.log(err);
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async orcGetUserById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await axios({
        method: "GET",
        url: `${userAPI}/${id}`,
      });
      // console.log(response);
      res.status(200).json(response.data);
    } catch (err) {
      // console.log("Masuk sini");
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }

  static async orcPostAddUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      // console.log(req.body);

      const response = await axios({
        method: "POST",
        url: `${userAPI}`,
        data: {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
      });

      res.status(201).json(response.data);
    } catch (err) {
      console.log(err.response.data);
      res.status(err.response.status).json({ message: err.response.data });
    }
  }

  static async orcDeleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      const response = await axios({
        method: "DELETE",
        url: `${userAPI}/${id}`,
      });
      // console.log(response);
      res.status(200).json(response.data);
    } catch (err) {
      console.log("Masuk sini");
      res.status(err.response.status).json({ message: err.response.data.message });
    }
  }
}

module.exports = userControlller;
