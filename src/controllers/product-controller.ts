import { Request, Response } from "express";
import Product from "../models/product-model";
import userId from "../middlewares/userid-token";
import productType, { productQuery } from "../types/product-type";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

const addProduct = async (req: Request, res: Response) => {
  try {
    const bodyValue: productType = req.body;
    const token = req.headers.authorization;
    if (process.env.JWT_SECRET_KEY) {
      if (!token || jwt.verify(token, process.env.JWT_SECRET_KEY)) {
        res.status(401).send({
          isSuccess: false,
          data: null,
          msg: "You are not authorized",
        });
        return;
      }
      bodyValue.productOwnerId = await userId(token);
    }
    let productAdded = await Product.create(bodyValue);
    res.status(200).send({ isSuccess: true, data: productAdded, msg: "" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    const token = req.headers.authorization;
    if (process.env.JWT_SECRET_KEY) {
      if (!token || !jwt.verify(token, process.env.JWT_SECRET_KEY)) {
        res.status(401).send({
          isSuccess: false,
          data: null,
          msg: "You are not authorized",
        });
        return;
      }
    }
    const id = new Types.ObjectId(productId);
    const product = await Product.findById(id);
    if (!product) {
      res.status(400).send({
        isSuccess: false,
        data: null,
        msg: `Product does not exist for ${productId}`,
      });
      return;
    }
    res.status(200).send({ isSuccess: true, data: product, msg: "" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const productFilter: productQuery = req.body;
    const token = req.headers.authorization;
    if (process.env.JWT_SECRET_KEY) {
      if (!token || jwt.verify(token, process.env.JWT_SECRET_KEY)) {
        res.status(401).send({
          isSuccess: false,
          data: null,
          msg: "You are not authorized",
        });
        return;
      }
    }

    let pro = Product.find();
    productFilter.pageSize = productFilter.pageSize ?? 20;
    productFilter.pageNumber = productFilter.pageNumber ?? 1;
    productFilter.productByPrice = productFilter.productByPrice ?? 0;
    if (productFilter.queryString) {
      pro = pro.find({
        productName: { $regex: new RegExp(productFilter.queryString, "i") },
      });
    }

    if (productFilter.productCategory) {
      pro = pro.find({ productCategory: productFilter.productCategory });
    }

    if (productFilter.productByGender) {
      pro = pro.find({ productByGender: productFilter.productByGender });
    }

    if (productFilter.productBySeason) {
      pro = pro.find({ productBySeason: productFilter.productBySeason });
    }

    if (productFilter.productByPrice) {
      pro = pro.find({
        productByPrice: { $lte: productFilter.productByPrice },
      });
    }

    const products = await pro
      .skip((productFilter.pageNumber - 1) * productFilter.pageSize)
      .limit(productFilter.pageSize);

    res.status(200).send({ isSuccess: true, data: products, msg: "" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error", err: error });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    let ownerId = "";
    const token = req.headers.authorization;
    if (process.env.JWT_SECRET_KEY) {
      if (!token || jwt.verify(token, process.env.JWT_SECRET_KEY)) {
        res.status(401).send({
          isSuccess: false,
          data: null,
          msg: "You are not authorized",
        });
        return;
      }
      ownerId = await userId(token);
    }

    let product = await Product.findById(new Types.ObjectId(productId));

    if (!product) {
      res.status(400).send({
        isSuccess: false,
        data: null,
        msg: `Product does not exist for ${productId}`,
      });
      return;
    }

    if (ownerId !== product._id.toString()) {
      res.status(401).send({
        isSuccess: false,
        data: null,
        msg: `You are not authorized`,
      });
      return;
    };

    let isDeleted = await Product.findByIdAndDelete(new Types.ObjectId(productId));
    if (isDeleted) {
      res
        .status(200)
        .send({ isSuccess: true, data: null, msg: "products deleted" });
    } else {
      res.status(400).send({
        isSuccess: false,
        data: null,
        msg: "Error deleting the product",
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  };
};

const rateProduct = async (req: Request, res: Response) => {
  try {
    const { productId, productRate } = req.body;
    const token = req.headers.authorization;
    if (process.env.JWT_SECRET_KEY) {
      if (!token || jwt.verify(token, process.env.JWT_SECRET_KEY)) {
        res.status(401).send({
          isSuccess: false,
          data: null,
          msg: "You are not authorized",
        });
        return;
      }
    }
    const product = await Product.findById(new Types.ObjectId(productId));
    if (!product) {
      res.status(400).send({
        isSuccess: false,
        data: null,
        msg: `Product does not exist for ${productId}`,
      });
      return;
    }
    let totalNumberOfRatedTimes = product.totalNumberOfRatedTimes + 1;
    let totalRate =
      (product.productRating + productRate) / totalNumberOfRatedTimes;
    const updatedProduct = await Product.findByIdAndUpdate(
      new Types.ObjectId(productId),
      {
        $set: {
          productRating: totalRate,
          totalNumberOfRatedTimes: totalNumberOfRatedTimes,
        },
      },
      { new: true }
    );

    res.status(200).send({
      isSuccess: true,
      data: updatedProduct,
      msg: ``,
    });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error" });
  }
};

export { addProduct, deleteProduct, getProductById, getProducts, rateProduct };
