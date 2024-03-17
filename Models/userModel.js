import mongoose from "mongoose";
import MBUV from "mongoose-beautiful-unique-validation";

var userSchema = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "Name is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone is Required"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "City is Required"],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is Required"],
    trim: true,
  },
  role: String,
  status: Number,
  info: String,
});

userSchema.plugin(MBUV);
var userScehmaModel = mongoose.model("portFolio", userSchema);

export default userScehmaModel;
