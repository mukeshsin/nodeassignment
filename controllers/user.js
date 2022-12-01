import * as dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";
import Address from "../models/address.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import SMTPConnection from "nodemailer/lib/smtp-connection/index.js";

//user Register
export const userRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    await bcrypt.hash(req.body.confirmPassword, salt);
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
  } catch (error) {
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};

//userlogin
export const userLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ error: "Please fill the details" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.compare(req.body.password, salt);
  try {
    const user = await User.findOne({
      where: {
        userName: userName,
        password: hashedPassword,
      },
    });
    if (!user) {
      res.status(400).json({ error: "user error" });
    } else {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hr",
      });
      return res.status(200).send({ user, token: token });
    }
  } catch (err) {
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};

//userDetail get by access token

export const GetUserDetails = async (req, res) => {
  try {
    const users = await User.findOne({
      where: {
        id: req.headers.id,
      },
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};

// userdetails delete by access token
export const deleteUserDetails = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.headers.id,
      },
    });
    res.status(200).send({
      message: "user Deleted",
    });
  } catch (error) {
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};

// users list by page no.
export const getUsersListByPage = async (req, res) => {
  const users = await User.findAndCountAll({
    limit: parseInt(req.query.limit),
    offset: (req.params.page - 1) * parseInt(req.query.limit),
  });
  res.status(200).send(users);
};

// post user address
export const postUserAddress = async (req, res) => {
  try {
    await Address.create({
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pinCode: req.body.pinCode,
      phoneNumber: req.body.phoneNumber,
      type: req.body.type,
      userId: req.body.userId,
    });
    res.status(200).send({
      message: "Insert Data successfully ",
    });
  } catch (error) {
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};

//userListWithAddress
export const getUserListAddressById = async (req, res) => {
  const data = await User.findAll({
    attributes: ["userName", "emailId"],
    include: [
      {
        model: Address,
        as: "addressList",
        attributes: ["address", "city", "state", "pinCode"],
      },
    ],
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send({ user: data });
};

export const userProfile = async (req, res) => {
  try {
    await User.update({ image: req.file.path }, { where: { id: req.body.id } });
    res.status(200).send({
      message: "Image updated successfully ",
    });
  } catch (error) {
    res.status(500).send({
      message: "500 error to the user",
    });
  }
};

export const userForgotPassword = async (req, res) => {
  try {
    const { userName } = req.body;
    if (!userName) {
      res.status(400).send({ message: "invalid credentials" });
    }
    const user = await User.findOne({
      where: {
        userName: userName,
      },
    });
    if (!user) {
      res.status(400).send({ message: " User Doesn't exist" });
    } else {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "10min",
      });
      await User.update(
        { passwordResetToken: token },
        { where: { userName: req.body.userName } }
      );
      res.status(200).send({ user: userName, token: token });
    }
  } catch (error) {
    res.status(500).send({ message: "500 error to the user" });
  }
};

export const verifyResetPassword = async (req, res) => {
  const { passwordResetToken } = req.params;
  if (!passwordResetToken) {
    res.status(400).json({ error: "Please provide reset token" });
  }
  jwt.verify(
    passwordResetToken,
    process.env.JWT_SECRET_KEY,
    async (err, user) => {
      if (err) {
        res.status(400).send({ message: "unauthorised token expire" });
      } else {
        const { password } = req.body;
        if (!password) {
          res.status(400).send({ message: "password cannot be empty" });
        }
        if (!password.length) {
          res.status(400).send({ message: "password cannot be empty" });
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
          await User.update(
            { password: hashedPassword, passwordResetToken: null },
            { where: { passwordResetToken: passwordResetToken } }
          );
          res.status(200).send({ message: "password changed successfully" });
        } catch (error) {
          console.log(error);
          res.status(500).send({ message: "500 error to the user" });
        }
      }
    }
  );
};

export const sendEmail = async (req, res) => {
  var transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  });

  var mailOptions = {
    from: "mukeshsingh7127@gmail.com",
    to: "mukesh@innotechteam.in",
    subject: "Sending Email using Node.js",
    text: "This is message  sended by gmail",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ message: "500 error to the user" });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ message: "Email has been sent successfully" });
    }
  });
};
