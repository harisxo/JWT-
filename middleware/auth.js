const jwt = require("jsonwebtoken");

const config = process.env;
// console.log(config.token_key);

const verifyToken = (req, res, next) => { 
  // console.log(req.headers)
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;
    // console.log(token)

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const tok = token.split(' ')[1]  // Split "Bearer token recieved"
    const decoded = jwt.verify(tok, config.token_key);
    // console.log(decoded);
    req.user = decoded;

  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
