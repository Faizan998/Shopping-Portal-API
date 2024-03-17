import express from "express";
import * as userController from "../Controller/userController.js";

const router = express.Router();

router.post("/save", userController.save);
router.get("/fetch", userController.fetch);
router.delete("/delete/:id", userController.deleteUser);
router.patch("/update", userController.updateUser);
router.post("/login", userController.login);

export default router;
