import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.userId ||
    req.query.userId ||
    req.params.userId ||
    req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded.email;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
