import mongoose from "mongoose";

const url = "mongodb://localhost:27017/shopping_portal";

mongoose.connect(url);
console.log("SuccessFully Connected MongoDB DataBase");
