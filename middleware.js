export const accessToken = async (res, req, next) => {
  if (!req.headers.id) {
    res.send("please provide users.id");
  } else if (req.headers.id) {
    res.send("valid user id");
  } else {
    next();
  }
};
