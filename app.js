import express from "express";
import bodyParser from "body-parser";

const app = express();
import userRouter from "./routes/userRouter.js";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.listen(3001, () => {
  console.log("Server Started at Link http://localhost:3001");
});
