const User = require("../models/userModel");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const data = await User.getAll();

      console.log(data);

      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const findUser = await User.getById(id);

      if (!findUser) {
        throw { name: "data-not-found" };
      }

      res.status(200).json({
        data: findUser,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  postAddUser: async (req, res, next) => {
    try {
      const { username, email, password, role, phoneNumber, address } = req.body;

      const addDataUser = await User.addUser({
        username,
        email,
        password,
        role,
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
      console.log(err);
      next(err);
    }
  },

  deleteUserById: async (req, res, next) => {
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
  },
};
