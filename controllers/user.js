import User from "../models/user.js";
export const userRegister = async (req, res) => {
    try {
      await User.register(req.body);
      res.status(200).send({
    
          message: "User register successful",
        });
    } catch (error) {
      res.status(500).send({
        message: "500 error to the user",
      });
    }
  };
  