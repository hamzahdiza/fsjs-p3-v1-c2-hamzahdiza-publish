const User = require("../models/userModel");

class Controller {
  static async getAllUsers(req, res, next) {
    try {
      const data = await User.getAll();

      console.log(data);

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const findUser = await User.getById(id);

      if (!findUser) {
        throw { name: "data-not-found" };
      }

      res.status(200).json(findUser);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postAddUser(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const addDataUser = await User.addUser({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      res.status(201).json({
        id: addDataUser.insertedId,
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
    } catch (err) {
      console.log(err.name, "OPOPOPOP");
      if (err.name === "username-notNull") {
        res.status(400).json(err.message);
      } else if (err.name === "email-notNull") {
        res.status(400).json(err.message);
      }
      if (err.name === "password-notNull") {
        res.status(400).json(err.message);
      }
      if (err.name === "phoneNumber-notNull") {
        res.status(400).json(err.message);
      }
      if (err.name === "address-notNull") {
        res.status(400).json(err.message);
      } else {
        next(err);
      }
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      const findUser = await User.getById(id);

      if (!findUser) {
        throw { name: "data-not-found" };
      }

      const deleteUser = await User.deleteById(id);

      res.status(200).json({
        message: "Delete Successfully",
        data: findUser,
      });
    } catch (err) {
      console.log(err);

      next(err);
    }
  }
}

module.exports = Controller;
