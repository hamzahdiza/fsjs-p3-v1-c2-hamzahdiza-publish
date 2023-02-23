const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "hamzah";

module.exports = {
  encodeToken: (payload) => {
    return jwt.sign(payload, JWT_SECRET_KEY);
  },

  decodeToken: (token) => {
    return jwt.verify(token, JWT_SECRET_KEY);
  },
};
