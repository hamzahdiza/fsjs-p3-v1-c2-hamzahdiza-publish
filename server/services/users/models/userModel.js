const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoConnection");

class User {
  static getCollections() {
    const db = getDatabase();
    const users = db.collection("Users");
    return users;
  }

  static async getAll() {
    return this.getCollections().find().toArray();
  }

  static async addUser(user) {
    try {
      if (!user.username) {
        throw { name: "username-notNull", message: "username is required" };
      }
      if (!user.email) {
        throw { name: "email-notNull", message: "email is required" };
      }
      if (!user.password) {
        throw { name: "password-notNull", message: "password is required" };
      }
      if (!user.phoneNumber) {
        throw { name: "phoneNumber-notNull", message: "phoneNumber is required" };
      }
      if (!user.address) {
        throw { name: "address-notNull", message: "address is required" };
      }

      return this.getCollections().insertOne({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    } catch (err) {
      throw err;
    }
  }

  static async getById(objectId) {
    return this.getCollections().findOne({
      _id: new ObjectId(objectId),
    });
  }

  static async deleteById(objectId) {
    return this.getCollections().deleteOne({
      _id: new ObjectId(objectId),
    });
  }
}

module.exports = User;
