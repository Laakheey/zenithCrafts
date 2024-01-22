import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

// interface ProductSchema {
//   productName: string,
//   productPrice: number,
//   productCategory: string,
//   productByGender: string,
//   productBySeason: string,
//   productQuantity: number,
//   productOwnerId: string,
// }

// interface ProductDocument extends ProductSchema, Document {
//   decodeToken(token: string) : Promise<string>;
// }

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  productByGender: {
    type: String,
    required: true,
  },
  productBySeason: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productOwnerId: {
    type: String,
    required: true,
  },
  productRating: {
    type: Number,
    required: true,
    default: 0
  },
  totalNumberOfRatedTimes: {
    type: Number,
    required: true,
    default: 0
  }
});

const Product = model('Product', productSchema);
export default Product;
