import { Request, Response } from "express";
import { signupType, loginType } from "../types/auth-type";
import User from "../models/user-model";

const login = async (req: Request, res: Response) => {
  try {
    const bodyValue: loginType = req.body;
    let user = await User.findOne({ email: bodyValue.email });
    if (!user) {
      return res
        .status(400)
        .send({ isSuccess: false, data: null, msg: "Invalid credentials" });
    } else if (!await user.checkPassword(bodyValue.password)) {
      return res.status(401).send({
        isSuccess: false,
        data: null,
        msg: "Invalid credentials",
      });
    } else {
      return res.status(200).send({ isSuccess: true, data: user, msg: "", token: await user.generateTokens() });
    };
  } catch (error) {
    res.status(500).send("Internal server error");
  };
};

const register = async (req: Request, res: Response) => {
  try {
    const bodyValue: signupType = req.body;
    const user = await User.findOne({ email: bodyValue.email });
    if (user) {
      return res
        .status(400)
        .send({ isSuccess: false, data: null, msg: "User already exists" });
    }
    let userRegister = await User.create(bodyValue);
    return res.status(200).send({ isSuccess: true, data: userRegister, msg: ""});
  } catch (error) {
    res.status(500).send("Internal server error");
  }
};

export { login, register };
