import "../Models/Connection.js";
import url from "url";
import ProductModel from "../Models/productModel.js";

export var save = async (req, res, next) => {
  var ProductDetails = req.body;
  var ProductList = await ProductModel.find();
  var l = ProductList.length;
  var _id = l == 0 ? 1 : ProductList[l - 1]._id + 1;
  ProductDetails = {
    ...ProductDetails,
    _id: _id,
  };

  var Product = await ProductModel.create(ProductDetails);
  if (Product) {
    res.status(200).json({ status: true });
  } else {
    res.status(500).json({ status: false });
  }
};

export var fetch = async (req, res, next) => {
  var Condition_obj = url.parse(req.url, true).query;
  var ProductList = await ProductModel.find(Condition_obj);
  var l = ProductList.length;
  if (l != 0) {
    res.status(200).json(ProductList);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
  next();
};

export var deleteProduct = async (req, res, next) => {
  var id = req.params.id;
  var ProductList = await ProductModel.find({ _id: id });
  var l = ProductList.length;
  if (l != 0) {
    var result = await ProductModel.deleteMany({ _id: id });
    if (result) {
      res.status(200).json({ User: "Delete User SuccessFully" });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(404).json({ errro: "Resource Not Found" });
  }
  next();
};

export var updateProduct = async (req, res, next) => {
  var ProductDetails = await ProductModel.findOne({ _id: req.body._id });
  if (ProductDetails) {
    var id = req.body._id;
    delete req.body._id;
    var Product = await ProductModel.updateOne({ _id: id }, { $set: req.body });
    if (Product) {
      res.status(200).json({ User: "User Updated SuccessFully" });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(404).json({ error: "Resource Not Available " });
  }
  next();
};
