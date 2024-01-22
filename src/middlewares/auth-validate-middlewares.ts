import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";

const signUpValidate =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      res.status(400).json({ message: error });
      next();
    }
  };

const loginValidate =
  (schema: Schema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (error) {
      res.status(400).json({ message: error });
      next();
    }
  };

export { loginValidate, signUpValidate };
// export default validate;
