import express from "express";
import { login, register } from "../controllers/auth-controller";

const router = express.Router();
import { signUpValidate, loginValidate } from "../middlewares/auth-validate-middlewares";
import { logInValidators, singUpValidators } from "../validators/auth-validators";

router.route("/login").get(loginValidate(logInValidators),login);
router.route("/register").post(signUpValidate(singUpValidators), register);

export default router;
