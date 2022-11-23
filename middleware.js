import jwt from "jsonwebtoken";

export const validateAccessToken = async (req, res, next) => {
  console.log(req);
  if (!req.headers.id) {
    res.status(400).send({ err: "please provide users.id" });
  } else {
    next();
  }
};

export const validateJwtToken = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["id"];
  if (!token) {
    res.status(401).send({ message: " please provide user.id" });
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      res.status(400).send({ message: "token expired" });
    } else {
      res.send(user);
      next();
    }
  });
};

