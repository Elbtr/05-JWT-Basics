const jwt = require("jsonwebtoken");

const { UnauthenticatedError } = require("../errors");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("No authorized to acces this route");
  }
};

module.exports = authMiddleware;
