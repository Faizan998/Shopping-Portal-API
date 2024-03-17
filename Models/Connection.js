import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/FaizanPortfolio";

mongoose.connect(url);
console.log("SuccessFully Connected MongoDB DataBase");
