const jwt = require("jsonwebtoken");

function veryfiyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];
    try {
      const decodedPayLoad = jwt.verify(token, process.env.SECRET);
      req.user = decodedPayLoad;
      next();
    } catch (error) {
      return res.status(401).json({ message: "invaild token, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "no token provided, access denied" });
  }
}

module.exports = {veryfiyToken};
