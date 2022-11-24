import jwt from "jsonwebtoken";

export const validateAccessToken = async (req, res, next) => {
  if (!req.headers.id) {
    res.status(400).send({ err: "please provide users.id" });
  } else {
    next();
  }
};

export const validateJwtToken = async (req, res, next) => {
  const token = req.headers
  if (!token) {
    res.status(401).send({ message: "unauthorised token" });
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
      res.status(400).send({ message: "unauthorised token expire" });
    } else {
      res.send(user);
      next();
    }
  });
};

