import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//user Register
export const userRegister = async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await bcrypt.hash(req.body.confirmPassword, salt);
  console.log(hashedPassword);
  console.log(salt);

  try {
    await User.create({
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      confirmPassword: hashedPassword,
      emailId: req.body.emailId,
      roleId: req.body.roleId,
    });

    res.status(200).send({
      message: "User register successful",
    });
    console.log(User);
  } catch (error) {
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};

//user login
export const userLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ error: "Please fill the details" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.compare(req.body.password, salt);
  console.log(hashedPassword);
  try {
    const userLogin = await User.findOne({
      where: {
        userName: userName,
        password: hashedPassword,
      },
    });
    console.log({ userName: userName, password: password });
    console.log(userLogin);
    if (!userLogin) {
      res.status(400).json({ error: "user error" });
    } else {
      return res.status(200).send({ id: userLogin.id });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};
