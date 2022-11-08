export const validateAccessToken = async (req, res, next) => {
  console.log(req);
  if (!req.headers.id) {
    res.status(400).send({ err: "please provide users.id" });
  } else {
    next();
  }
};
