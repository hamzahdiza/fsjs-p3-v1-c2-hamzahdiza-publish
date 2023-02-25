function errorHandler(err, req, res, next) {
  if (err.name === "data-not-found") {
    res.status(404).json({
      message: "Data not found",
    });
  } else if (err.name === "BSONError") {
    res.status(400).json({ message: err.message });
  } else if (err.name === "forbidden") {
    the;
    res.status(403).json({ message: "This action is only for admin role or the original author" });
  } else if (err.name === "invalid-login") {
    res.status(401).json({ message: "Email/Password Invalid" });
  } else if (err.name === "invalid-token" || err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid Token" });
  } else {
    res.status(500).json({ message: "Fixing 500 Internal Server Error Problems on Your Own Site" });
  }
}

module.exports = errorHandler;
