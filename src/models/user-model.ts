import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


interface UserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
}

interface UserDocument extends UserSchema, Document {
  generateTokens(): Promise<string>;
  checkPassword(password: string) : Promise<boolean>;
}

const userScheme = new mongoose.Schema<UserDocument>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userScheme.pre("save", async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    user.password = hashPassword;
  } catch (error: any) {
    next(error);
  }
});

userScheme.methods.generateTokens = async function(){
  try {
    if(process.env.JWT_SECRET_KEY){
      return jwt.sign({
        name: `${this.firstName} ${this.lastName}`,
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
      });
    };
  } catch (error) {
    console.log(error);
    throw error;
  };
};

userScheme.methods.checkPassword = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
    return false;
  }
}

const User = mongoose.model("User", userScheme);
export default User;
