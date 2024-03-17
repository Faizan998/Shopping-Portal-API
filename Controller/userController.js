import "../Models/Connection.js";
import userScehmaModel from "../Models/userModel.js";
import url from "url";
import rs from "randomstring";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

export var save = async (req, res, next) => {
  var userDetails = req.body;
  var userList = await userScehmaModel.find();
  var l = userList.length;
  var _id = l == 0 ? 1 : userList[l - 1]._id + 1;
  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(userDetails.password, 10);
  userDetails = {
    ...userDetails,
    _id: _id,
    status: 0,
    role: "user",
    info: Date(),
    password: hashedPassword,
  };

  var user = await userScehmaModel.create(userDetails);
  if (user) {
    res.status(200).json({ status: true });
  } else {
    res.status(500).json({ status: false });
  }
  next();
};

export var fetch = async (req, res, next) => {
  var Condition_obj = url.parse(req.url, true).query;
  var userList = await userScehmaModel.find(Condition_obj);
  var l = userList.length;
  if (l != 0) {
    res.status(200).json(userList);
  } else {
    res.status(500).json({ error: "Server Error" });
  }
  next();
};

export var deleteUser = async (req, res, next) => {
  var id = req.params.id;
  var userList = await userScehmaModel.find({ _id: id });
  var l = userList.length;
  if (l != 0) {
    var result = await userScehmaModel.deleteMany({ _id: id });
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

export var updateUser = async (req, res, next) => {
  var userDetails = await userScehmaModel.findOne(req.body.condition);
  if (userDetails) {
    var user = await userScehmaModel.updateOne(
      req.body.condition,
      req.body.set
    );
    if (user) {
      res.status(200).json({ User: "User Updated SuccessFully" });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  } else {
    res.status(404).json({ error: "Resource Not Available " });
  }
  next();
};

export const login = async (req, res, next) => {
  try {
    // Extract user credentials from the request body
    const { email, password } = req.body;

    // Check if the user exists and is active
    const userDetails = { email, status: 1 };
    const userList = await userScehmaModel.find(userDetails);

    if (userList.length === 1) {
      const user = userList[0];

      // Authenticate user by comparing passwords using bcrypt
      const passMatch = await bcrypt.compare(password, user.password);

      if (passMatch) {
        // If authentication is successful, generate a JWT token
        const payload = { subject: user.email };
        const key = rs.generate();
        const token = JWT.sign(payload, key);

        // Send the token and user details in the response
        res.status(200).json({ token, userDetails: user });
      } else {
        // Invalid password
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      // User not found or inactive
      res.status(401).json({ error: "User not found or inactive" });
    }
  } catch (error) {
    // Internal server error
    res.status(500).json({ error: error.message });
  }

  // Call the next middleware (if any)
  next();
};
