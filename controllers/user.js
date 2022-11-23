import User from "../models/user.js";
import Address from "../models/address.js";
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

//userlogin
export const userLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.status(400).json({ error: "Please fill the details" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.compare(req.body.password, salt);
  console.log(hashedPassword);
  try {
    const user = await User.findOne({
      where: {
        userName: userName,
        password: hashedPassword,
      },
    });
    console.log({ userName: userName, password: password });
    console.log(user);
    if (!user) {
      res.status(400).json({ error: "user error" });
    } else {
      let token = jwt.sign({ id: user.id }, "secret", { expiresIn: "1hr" });
      return res.status(200).send({ user, token: token });
    }
  } catch (err) {
    console.log(err);
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
    console.log(users);
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
  console.log(users);
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
    console.log(Address);
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
  console.log(data);
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
