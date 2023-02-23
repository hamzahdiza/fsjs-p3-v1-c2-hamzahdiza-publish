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
    return this.getCollections().insertOne({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
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
