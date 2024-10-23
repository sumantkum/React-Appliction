import express from "express"
import { deleteUser, getAllUsers, getBookingOfUser, loginUser, signup, updateUser } from "../Controller/user-controller.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);
userRouter.get("/bookings/:id", getBookingOfUser);

export default userRouter;